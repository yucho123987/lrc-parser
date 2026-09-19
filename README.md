# lrc-parser
English | [简体中文](https://github.com/yucho123987/lrc-parser/blob/main/README.zh-cn.md)  
An LRC-format lyrics parser written in JavaScript that supports both Node.js and browser environments.
## Installation
```bash
npm install @yucho123987/lrc-parser
```
## Usage
### Import
```javascript
import { LrcParser } from "@yucho123987/lrc-parser";
```
### Initialization
```javascript
var parser = new LrcParser();
```
You can also pass an LRC lyrics string, and LrcParser will parse it:
```javascript
var parser = new LrcParser(`
[00:16.000][00:31.154]Never gonna give you up
[00:16.000][00:31.154]永远不会放弃你
[00:21.154]Never gonna let you down
[00:21.154]永远不会让你失望
`);
```
### API
#### parser.listLyrics()
**Function**: Lists all lyrics.  
**Parameters**: None.  
**Return Value**: An array. The elements of this array are all objects, and each object contains the properties shown in the table below:  
|Property|Type|Description|
|-|-|-|
|time|Non-negative integer|Timestamp in milliseconds|
|lyrics|String|Lyrics text|
|translation|String/null|Translated lyrics|

**Example**:  
Print all lyrics:
```javascript
let lyricsList = parser.listLyrics();
lyricsList.forEach(lyricsItem => {
  console.log(lyricsItem.lyrics + (lyricsItem.translation == null ? "" : "\n" + lyricsItem.translation));
});
```
#### parser.getLyrics(time)
**Function**: Retrieves the lyrics corresponding to a specific time.  
**Parameters**:
|Parameter|Type|Description|
|-|-|-|
|time|Non-negative integer|Time, in milliseconds|

**Return Value**: Returns an object if lyrics exist for the specified time; otherwise, returns null. The returned object contains the properties shown in the table below:
|Property|Type|Description|
|-|-|-|
|lyrics|String|Lyrics text|
|translation|String/null|Translated lyrics|

**Example**:  
Print the lyrics corresponding to 1 minute, 54 seconds, and 514 milliseconds (114,514 milliseconds):
```javascript
let lyricsInfo = parser.getLyrics(114514);
console.log(lyricsInfo.lyrics + (lyricsInfo.translation == null ? "" : "\n" + lyricsInfo.translation));
```
#### parser.updateLyrics(time, lyrics, translation = null)
**Function**: Updates the lyrics and translation corresponding to a specific time.  
**Parameters**:
|Parameter|Type|Description
|-|-|-|
|time|Non-negative integer|Time, in milliseconds|
|lyrics|String|Lyrics text|
|translation|String/null|Lyrics translation text|

**Return Value**: undefined.  
**Example**:  
Set the lyrics corresponding to 1 minute, 54 seconds, and 514 milliseconds (114,514 milliseconds) to “Never gonna give you up”:
```javascript
parser.updateLyrics(114514, "Never gonna give you up");
```
Set the lyrics corresponding to 1 minute, 54 seconds, and 514 milliseconds (114,514 milliseconds) to “Never gonna give you up,” along with the Chinese translation “永远不会放弃你”:
```javascript
parser.updateLyrics(114514, "Never gonna give you up", "永远不会放弃你");
```
#### parser.deleteLyrics(time)
**Function**: Deletes the lyrics associated with a specific time.  
**Parameters**:
|Parameter|Type|Description|
|-|-|-|
|time|Non-negative integer|Time, in milliseconds|

**Return Value**: Returns `true` if lyrics exist for the specified time; otherwise, returns `false`.  
**Example**:  
Delete the lyrics corresponding to 1 minute, 54 seconds, and 514 milliseconds (114,514 milliseconds):
```javascript
parser.deleteLyrics(114514);
```
#### parser.toString()
**Function**: Converts the LrcParser object into an LRC lyrics string.  
**Parameters**: None.  
**Return Value**: String.  
**Example**:  
Print all lyrics in LRC format:
```javascript
console.log(parser.toString());
```
#### parser.useTraditionalFormat = [value]
**Function**: Sets whether to output LRC lyrics in the traditional format (one time value per line).  
**Parameters**:
|Parameter|Type|Description|
|-|-|-|
|[value]|Boolean|Whether to output LRC lyrics in the traditional format|
#### LrcParser.lrcTimeText2Millseconds(providedLrcTimeText)
**Function**: Converts the time text in LRC-format lyrics to milliseconds.  
**Parameters**:
|Parameter|Type|Description|
|-|-|-|
|providedLrcTimeText|String|Time text|
**Return Value**: Non-negative integer.
#### LrcParser.millseconds2LrcTimeText(providedMillseconds)
**Function**: Converts a non-negative integer time value into LRC time text.  
**Parameters**:
|Parameter|Type|Description|
|-|-|-|
|providedMillseconds|Non-negative integer|Time|
**Return Value**: String.