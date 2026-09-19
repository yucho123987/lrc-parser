# lrc-parser
[English](https://github.com/yucho123987/lrc-parser/blob/main/README.md) | 简体中文  
一个用 JavaScript 编写的 LRC 格式歌词解析器，同时支持 Node.js 和浏览器环境。
## 安装
```bash
npm install @yucho123987/lrc-parser
```
## 用法
### 引入
```javascript
import { LrcParser } from "@yucho123987/lrc-parser";
```
### 初始化
```javascript
var parser = new LrcParser();
```
你也可以传入一段 LRC 歌词字符串，LrcParser 会解析这段字符串：
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
**作用**：列出所有的歌词。  
**参数**：无。  
**返回值**：数组。该数组的元素均为对象，每个对象包含如下表所示的属性：  
|属性|类型|说明|
|-|-|-|
|time|非负整数|时刻，单位为毫秒|
|lyrics|字符串|歌词文本|
|translation|字符串/null|歌词翻译文本|

**示例**：  
打印所有的歌词：
```javascript
let lyricsList = parser.listLyrics();
lyricsList.forEach(lyricsItem => {
  console.log(lyricsItem.lyrics + (lyricsItem.translation == null ? "" : "\n" + lyricsItem.translation));
});
```
#### parser.getLyrics(time)
**作用**：获取某个时刻对应的歌词。  
**参数**：
|参数|类型|说明|
|-|-|-|
|time|非负整数|时刻，单位为毫秒|

**返回值**：传入时刻存在对应的歌词时，返回一个对象，反之，则返回null。返回的对象包含如下表所示的属性：
|属性|类型|说明|
|-|-|-|
|lyrics|字符串|歌词文本|
|translation|字符串/null|歌词翻译文本|

**示例**：  
打印1分54秒514毫秒（114514毫秒）时对应的歌词：
```javascript
let lyricsInfo = parser.getLyrics(114514);
console.log(lyricsInfo.lyrics + (lyricsInfo.translation == null ? "" : "\n" + lyricsInfo.translation));
```
#### parser.updateLyrics(time, lyrics, translation = null)
**作用**：更新某个时刻所对应的的歌词和翻译。  
**参数**：
|参数|类型|说明
|-|-|-|
|time|非负整数|时刻，单位为毫秒|
|lyrics|字符串|歌词文本|
|translation|字符串/null|歌词翻译文本|

**返回值**：undefined。  
**示例**：  
将1分54秒514毫秒（114514毫秒）时对应的歌词设置为“Never gonna give you up”：
```javascript
parser.updateLyrics(114514, "Never gonna give you up");
```
将1分54秒514毫秒（114514毫秒）时对应的歌词设置为“Never gonna give you up”，并附上中文翻译“永远不会放弃你”：
```javascript
parser.updateLyrics(114514, "Never gonna give you up", "永远不会放弃你");
```
#### parser.deleteLyrics(time)
**作用**：删除某个时刻所对应的歌词。  
**参数**：
|参数|类型|说明|
|-|-|-|
|time|非负整数|时刻，单位为毫秒|

**返回值**：若传入的时刻存在对应的歌词，则返回true，否则返回false。  
**示例**：  
删除1分54秒514毫秒（114514毫秒）时对应的歌词：
```javascript
parser.deleteLyrics(114514);
```
#### parser.toString()
**作用**：将LrcParser对象转换成LRC歌词字符串。  
**参数**：无。  
**返回值**：字符串。  
**示例**：  
打印所有LRC格式歌词：
```javascript
console.log(parser.toString());
```
#### parser.useTraditionalFormat = [value]
**作用**：设置是否以传统格式（一行只有一个时刻）输出LRC歌词。  
**参数**：
|参数|类型|说明|
|-|-|-|
|[value]|布尔值|是否以传统格式输出LRC歌词|
#### LrcParser.lrcTimeText2Millseconds(providedLrcTimeText)
**作用**：将LRC格式歌词中的时刻文本转换成毫秒。  
**参数**：
|参数|类型|说明|
|-|-|-|
|providedLrcTimeText|字符串|时刻文本|
**返回值**：非负整数。
#### LrcParser.millseconds2LrcTimeText(providedMillseconds)
**作用**：将非负整数类型的时刻转换成LRC时刻文本。  
**参数**：
|参数|类型|说明|
|-|-|-|
|providedMillseconds|非负整数|时刻|
**返回值**：字符串。