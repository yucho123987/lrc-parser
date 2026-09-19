/** 
 * FileName:    LrcParser.js
 * Author:      yucho123987
 * Version:     v1.0.0
 * Date:        2826.09.01
 * Description: A simple parser for LRC files.
 * 
 * CopyRight (c)  2026 yucho123987@163.com   All Right Reseverd
 */

class LrcParser {
  #time = [];
  #lyrics = {};
  #useTraditionalFormat = false;
  
  constructor(lrcContent = null) {
    if (typeof lrcContent != "string" && lrcContent !== null) {
      throw new TypeError("The parameter 'lrcContent' should be a string or null");
    }
    if (lrcContent == null) {
      return;
    }
    let lrcLyricsLines = lrcContent.split("\n").filter(lyricsLine => {
      return /\[\d{2}:\d{2}\.\d{3}\]/.test(lyricsLine);
    });
    for (let i = 0; i < lrcLyricsLines.length; i++) {
      let lyricsTime =lrcLyricsLines[i].match(/\[\d{2}:\d{2}\.\d{3}\]/g);
      let lyricsText = lrcLyricsLines[i];
      lyricsTime.forEach(time => {
        let reg = new RegExp(time.replace("[", "\\[").replace("\\]"),"g");
        lyricsText = lyricsText.replace(reg, "");
      });
      lyricsTime.forEach(time => {
        let lrcLyricsMs = LrcParser.lrcTimeText2Millseconds(time);
        if (this.getLyrics(lrcLyricsMs) == null) {
          this.updateLyrics(lrcLyricsMs, lyricsText);
        } else {
          this.updateLyrics(lrcLyricsMs, this.getLyrics(lrcLyricsMs).lyrics, lyricsText);
        }
      });
    }
  }
  #generateLrcLine(msTime, lyrics, translation) {
    let lrcTimeText = "";
    msTime.forEach(time => {
      lrcTimeText += LrcParser.millseconds2LrcTimeText(time);
    });
    return `${lrcTimeText}${lyrics}` + (translation == null ? "" : `\n${lrcTimeText}${translation}`);
  }
  listLyrics() {
    let result = [];
    this.#time.forEach(time => {
      let lyrics = this.getLyrics(time);
      result.push({
        time,
        lyrics: lyrics.lyrics,
        translation: lyrics.translation
      });
    });
    return result;
  }
  getLyrics(time) {
    if (!Number.isInteger(time) || time < 0) {
      throw new TypeError("The parameter 'time' should be a non-negative integer");
    }
    if (!this.#time.includes(time)) {
      return null;
    }
    return this.#lyrics[`moment_${time}`];
  }
  updateLyrics(time, lyrics, translation = null) {
    if (!Number.isInteger(time) || time < 0) {
      throw new TypeError("The parameter 'time' should be a non-negative integer");
    }
    if (typeof lyrics != "string") {
      throw new TypeError("The parameter 'lyrics' should be a string");
    }
    if (typeof translation != "string" && !(typeof translation == "object" && translation == null)) {
      throw new TypeError("The parameter 'translation' should be either null or a string.");
    }
    if (this.getLyrics(time) == null) {
      let pos = this.#time.length;
      for (let i = 0; i < this.#time.length; i++) {
        if (time < this.#time[i]) {
          pos = i;
          break;
        }
      }
      this.#time.splice(pos, 0, time);
    }
    this.#lyrics[`moment_${time}`] = { lyrics,
      translation
    };
  }
  deleteLyrics(time) {
    if (!Number.isInteger(time) || time < 0) {
      throw new TypeError("The parameter 'time' should be a non-negative integer");
    }
    if (this.getLyrics(time) == null) {
      return false;
    }
    this.#time.splice(this.#time.indexOf(time), 1);
    delete this.#lyrics[`moment_${time}`];
    return true;
  }
  set useTraditionalFormat(value) {
    if (typeof value != "boolean") {
      throw new TypeError("The given value should be a boolean value");
    }
    this.#useTraditionalFormat = value;
  }
  static millseconds2LrcTimeText(providedMillseconds) {
    if (!Number.isInteger(providedMillseconds) || providedMillseconds < 0) {
      throw new TypeError("The parameter 'providedMillseconds' should be a non-negative integer");
    }
    let minutes = Math.trunc(providedMillseconds / 1000 / 60).toString().padStart(2, "0");
    let seconds = Math.trunc(providedMillseconds / 1000 - minutes * 60).toString().padStart(2, 0);
    let millseconds = Math.trunc(providedMillseconds - minutes * 60 * 1000 - seconds * 1000).toString().padStart(3, "0");
    return `[${minutes}:${seconds}.${millseconds}]`;
  }
  static lrcTimeText2Millseconds(providedLrcTimeText) {
    if (!(/^\[\d{2}:\d{2}\.\d{3}\]$/).test(providedLrcTimeText)) {
      throw new TypeError("The parameter ' providedLrcTimeText' should be a valid LRC time string");
    }
    let minutes = parseInt(providedLrcTimeText.match(/\[(.*?):/)[1]);
    let seconds = parseInt(providedLrcTimeText.match(/:(.*?)\./)[1]);
    let millseconds = parseInt(providedLrcTimeText.match(/\.(.*?)\]/)[1]);
    return minutes * 60 * 1000 + seconds * 1000 + millseconds;
  }
  toString() {
    let result = "";
    if (this.#useTraditionalFormat) {
      for (let i = 0; i < this.#time.length; i++) {
        let time = this.#time[i];
        let lyrics = this.#lyrics[`moment_${time}`];
        result += `${result == "" ? "" : "\n"}${this.#generateLrcLine([time], lyrics.lyrics, lyrics.translation)}`;
      }
    } else {
      let lyricsText = [];
      let lyricsTime = [];
      this.#time.forEach(time => {
        let currentReadLyrics = this.getLyrics(time);
        let lyricsPos = -1;
        for (let i = 0; i < lyricsText.length; i++) {
          if (lyricsText[i].lyrics == currentReadLyrics.lyrics) {
            lyricsPos = i;
            break;
          }
        }
        if (lyricsPos < 0) {
          lyricsText.push(currentReadLyrics);
          lyricsTime.push([time]);
        } else {
          lyricsTime[lyricsPos].push(time);
        }
      });
      for (let i = 0; i < lyricsTime.length; i++) {
        result += `${result == "" ? "" : "\n"}${this.#generateLrcLine(lyricsTime[i], lyricsText[i].lyrics, lyricsText[i].translation)}`;
      }
    }
    return result;
  }
}

export default LrcParser;