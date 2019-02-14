(function(mod){if("object"==typeof exports&&"object"==typeof module)mod(require("../../lib/codemirror"));else if("function"==typeof define&&define.amd)define(["../../lib/codemirror"],mod);else mod(CodeMirror)})(function(CodeMirror){"use strict";CodeMirror.defineMode("coffeescript",function(conf,parserConf){var ERRORCLASS="error";function wordRegexp(words){return new RegExp("^(("+words.join(")|(")+"))\\b")}var operators=/^(?:->|=>|\+[+=]?|-[\-=]?|\*[\*=]?|\/[\/=]?|[=!]=|<[><]?=?|>>?=?|%=?|&=?|\|=?|\^=?|\~|!|\?|(or|and|\|\||&&|\?)=)/,delimiters=/^(?:[()\[\]{},:`=;]|\.\.?\.?)/,identifiers=/^[_A-Za-z$][_A-Za-z$0-9]*/,atProp=/^@[_A-Za-z$][_A-Za-z$0-9]*/,wordOperators=wordRegexp(["and","or","not","is","isnt","in","instanceof","typeof"]),indentKeywords=["for","while","loop","if","unless","else","switch","try","catch","finally","class"],keywords=wordRegexp(indentKeywords.concat(["break","by","continue","debugger","delete","do","in","of","new","return","then","this","@","throw","when","until","extends"]));indentKeywords=wordRegexp(indentKeywords);var stringPrefixes=/^('{3}|\"{3}|['\"])/,regexPrefixes=/^(\/{3}|\/)/,constants=wordRegexp(["Infinity","NaN","undefined","null","true","false","on","off","yes","no"]);function tokenBase(stream,state){if(stream.sol()){if(null===state.scope.align)state.scope.align=!1;var scopeOffset=state.scope.offset;if(stream.eatSpace()){var lineOffset=stream.indentation();if(lineOffset>scopeOffset&&"coffee"==state.scope.type){return"indent"}else if(lineOffset<scopeOffset){return"dedent"}return null}else{if(0<scopeOffset){dedent(stream,state)}}}if(stream.eatSpace()){return null}var ch=stream.peek();if(stream.match("####")){stream.skipToEnd();return"comment"}if(stream.match("###")){state.tokenize=longComment;return state.tokenize(stream,state)}if("#"===ch){stream.skipToEnd();return"comment"}if(stream.match(/^-?[0-9\.]/,!1)){var floatLiteral=!1;if(stream.match(/^-?\d*\.\d+(e[\+\-]?\d+)?/i)){floatLiteral=!0}if(stream.match(/^-?\d+\.\d*/)){floatLiteral=!0}if(stream.match(/^-?\.\d+/)){floatLiteral=!0}if(floatLiteral){if("."==stream.peek()){stream.backUp(1)}return"number"}var intLiteral=!1;if(stream.match(/^-?0x[0-9a-f]+/i)){intLiteral=!0}if(stream.match(/^-?[1-9]\d*(e[\+\-]?\d+)?/)){intLiteral=!0}if(stream.match(/^-?0(?![\dx])/i)){intLiteral=!0}if(intLiteral){return"number"}}if(stream.match(stringPrefixes)){state.tokenize=tokenFactory(stream.current(),!1,"string");return state.tokenize(stream,state)}if(stream.match(regexPrefixes)){if("/"!=stream.current()||stream.match(/^.*\//,!1)){state.tokenize=tokenFactory(stream.current(),!0,"string-2");return state.tokenize(stream,state)}else{stream.backUp(1)}}if(stream.match(operators)||stream.match(wordOperators)){return"operator"}if(stream.match(delimiters)){return"punctuation"}if(stream.match(constants)){return"atom"}if(stream.match(atProp)||state.prop&&stream.match(identifiers)){return"property"}if(stream.match(keywords)){return"keyword"}if(stream.match(identifiers)){return"variable"}stream.next();return ERRORCLASS}function tokenFactory(delimiter,singleline,outclass){return function(stream,state){while(!stream.eol()){stream.eatWhile(/[^'"\/\\]/);if(stream.eat("\\")){stream.next();if(singleline&&stream.eol()){return outclass}}else if(stream.match(delimiter)){state.tokenize=tokenBase;return outclass}else{stream.eat(/['"\/]/)}}if(singleline){if(parserConf.singleLineStringErrors){outclass=ERRORCLASS}else{state.tokenize=tokenBase}}return outclass}}function longComment(stream,state){while(!stream.eol()){stream.eatWhile(/[^#]/);if(stream.match("###")){state.tokenize=tokenBase;break}stream.eatWhile("#")}return"comment"}function indent(stream,state,type){type=type||"coffee";for(var offset=0,align=!1,alignOffset=null,scope=state.scope;scope;scope=scope.prev){if("coffee"===scope.type||"}"==scope.type){offset=scope.offset+conf.indentUnit;break}}if("coffee"!==type){align=null;alignOffset=stream.column()+stream.current().length}else if(state.scope.align){state.scope.align=!1}state.scope={offset:offset,type:type,prev:state.scope,align:align,alignOffset:alignOffset}}function dedent(stream,state){if(!state.scope.prev)return;if("coffee"===state.scope.type){for(var _indent=stream.indentation(),matched=!1,scope=state.scope;scope;scope=scope.prev){if(_indent===scope.offset){matched=!0;break}}if(!matched){return!0}while(state.scope.prev&&state.scope.offset!==_indent){state.scope=state.scope.prev}return!1}else{state.scope=state.scope.prev;return!1}}function tokenLexer(stream,state){var style=state.tokenize(stream,state),current=stream.current();if("return"===current){state.dedent=!0}if(("->"===current||"=>"===current)&&stream.eol()||"indent"===style){indent(stream,state)}var delimiter_index="[({".indexOf(current);if(-1!==delimiter_index){indent(stream,state,"])}".slice(delimiter_index,delimiter_index+1))}if(indentKeywords.exec(current)){indent(stream,state)}if("then"==current){dedent(stream,state)}if("dedent"===style){if(dedent(stream,state)){return ERRORCLASS}}delimiter_index="])}".indexOf(current);if(-1!==delimiter_index){while("coffee"==state.scope.type&&state.scope.prev)state.scope=state.scope.prev;if(state.scope.type==current)state.scope=state.scope.prev}if(state.dedent&&stream.eol()){if("coffee"==state.scope.type&&state.scope.prev)state.scope=state.scope.prev;state.dedent=!1}return style}return{startState:function(basecolumn){return{tokenize:tokenBase,scope:{offset:basecolumn||0,type:"coffee",prev:null,align:!1},prop:!1,dedent:0}},token:function(stream,state){var fillAlign=null===state.scope.align&&state.scope;if(fillAlign&&stream.sol())fillAlign.align=!1;var style=tokenLexer(stream,state);if(style&&"comment"!=style){if(fillAlign)fillAlign.align=!0;state.prop="punctuation"==style&&"."==stream.current()}return style},indent:function(state,text){if(state.tokenize!=tokenBase)return 0;var scope=state.scope,closer=text&&-1<"])}".indexOf(text.charAt(0));if(closer)while("coffee"==scope.type&&scope.prev)scope=scope.prev;var closes=closer&&scope.type===text.charAt(0);if(scope.align)return scope.alignOffset-(closes?1:0);else return(closes?scope.prev:scope).offset},lineComment:"#",fold:"indent"}});CodeMirror.defineMIME("application/vnd.coffeescript","coffeescript");CodeMirror.defineMIME("text/x-coffeescript","coffeescript");CodeMirror.defineMIME("text/coffeescript","coffeescript")});