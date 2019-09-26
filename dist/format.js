window.storyFormat({
  "name": "Twivan",
  "version": "0.0.3",
  "author": "RoadRunner",
  "description": "Export your Twine 2 story as a JSON document with new variable style",
  "proofing": false,
  "image": "logo.svg",
  "source": "<html>\r\n\t<head>\r\n\t\t<title>{{STORY_NAME}}</title>\r\n\t\t<script type=\"text/javascript\">\r\nvar Twison={extractLinksFromText:function(t){var a=t.match(/\\[\\[.+?\\]\\]/g);if(a)return a.map(function(t){var a=t.match(/\\[\\[(.*?)\\-\\&gt;(.*?)\\]\\]/);if(a){var e={link:a[2]},n=a[1].match(/%%([^!]+?)%%/),s=a[1].match(/%%!([^!]+?)%%/);return n&&(a[1]=a[1].replace(/%%([^!]+?)%%/,\"\"),e.set=n[1]),s&&(a[1]=a[1].replace(/%%!([^!]+?)%%/,\"\"),e.unset=s[1]),e.name=a[1],e}return t=t.substring(2,t.length-2),{name:t,link:t}})},convertPassage:function(t){var a={text:t.innerHTML},e=Twison.extractLinksFromText(a.text);return e&&(a.links=e),a.text=a.text.replace(/%%.+?%%/g,\"\"),a.text.match(/%IFPASSAGE%/g)&&(a.ifpassage=!0),[\"name\",\"pid\",\"tags\"].forEach(function(e){var n=t.attributes[e].value;n&&(a[e]=n)}),a.tags&&(a.tags=a.tags.split(\" \")),a},convertStory:function(t){var a=t.getElementsByTagName(\"tw-passagedata\"),e={};Array.prototype.slice.call(a).map(function(t){e[t.attributes.pid.value]=Twison.convertPassage(t)});var n={passages:e};[\"name\",\"startnode\",\"creator-version\"].forEach(function(a){var e=t.attributes[a].value;e&&(n[a]=e)});var s={};return Object.keys(n.passages).forEach(function(t){s[n.passages[t].name]=n.passages[t].pid}),Object.keys(n.passages).forEach(function(t){n.passages[t].links&&n.passages[t].links.forEach(function(t){t.pid=s[t.link],t.pid||(t.broken=!0)})}),n},convert:function(){var t=document.getElementsByTagName(\"tw-storydata\")[0],a=JSON.stringify(Twison.convertStory(t),null,2);document.getElementById(\"output\").innerHTML=a}};window.Twison=Twison;\t\t\r\n\t\t</script>\r\n\t</head>\r\n\t<body>\r\n\t\t<pre id=\"output\">\r\n\t\t\r\n\t\t</pre>\r\n\t\t<div id=\"storyData\" style=\"display: none;\">\r\n\t\t\t{{STORY_DATA}}\r\n\t\t</div>\r\n\t\t<script>\r\n\t\t\tTwison.convert()\r\n\t\t</script>\r\n\t</body>\r\n</html>"
});