var Twison = {
  extractLinksFromText: function(text) {
    var links = text.match(/\[\[.+?\]\]/g)
    if (links) {
      return links.map(function(link) {
        var differentName = link.match(/\[\[(.*?)\-\&gt;(.*?)\]\]/);
        if (differentName) {
          var ret = {link : differentName[2]};
          /*
          è possibile impostare massimo una variabile nel nome del link con %%NomeVariabile%% 
          eliminarne al massimo una %%!NomeVariabile%% nel nome della variabile l'unico simbolo vietato è ! 
          e il nome variabile default (la variabile default è sempre vera)
          */
          var vari = differentName[1].match(/%%([^!]+)%%/);
          var novari = differentName[1].match(/%%!([^!]+)%%/);
          if (vari){
            differentName[1] = differentName[1].replace(/%%([^!]+)%%/, "");
            ret.set = vari[1];
          }
          if (novari) {
            differentName[1] = differentName[1].replace(/%%!([^!]+)%%/, "");
            ret.unset = novari[1];
          } 
          ret.name = differentName[1];

          // [[name->link]]
          return ret;
        } else {
          // [[link]]
          link = link.substring(2, link.length-2)
          return {
            name: link,
            link: link
          }
        }
      });
    }
  },

    convertPassage: function(passage) {
  	var dict = {text: passage.innerHTML};

    var links = Twison.extractLinksFromText(dict.text);
    if (links) {
      dict.links = links;
    }

    //Rimuovo dai link quello che serve per la definizione delle variabili
    dict.text = dict.text.replace(/%%.+%%/g,"");

    //IDENTIFICO SE E' UN IF PASSAGE distinto con la sequenza %IFPASSAGE% nel testo
    if (dict.text.match(/%IFPASSAGE%/g)){
      dict.ifpassage = true;
    }

    ["name", "pid", "tags"].forEach(function(attr) {
      var value = passage.attributes[attr].value;
      if (value) {
        dict[attr] = value;
      }
    });

    if (dict.tags) {
      dict.tags = dict.tags.split(" ");
    }

    return dict;
	},

  convertStory: function(story) {
    var passages = story.getElementsByTagName("tw-passagedata");
    var convertedPassages = {}
    Array.prototype.slice.call(passages).map(function(ps) { convertedPassages[ps.attributes['pid'].value] = Twison.convertPassage(ps)});

    var dict = {
      passages: convertedPassages
    };

    ["name", "startnode", "creator-version", "ifid"].forEach(function(attr) {
      var value = story.attributes[attr].value;
      if (value) {
        dict[attr] = value;
      }
    });

    // Add PIDs to links
    var pidsByName = {};
    Object.keys(dict.passages).forEach(function(key) {
      pidsByName[dict.passages[key].name] = dict.passages[key].pid;
    });

    Object.keys(dict.passages).forEach(function(key) {
      if (!dict.passages[key].links) return;
      dict.passages[key].links.forEach(function(link) {
        link.pid = pidsByName[link.link];
        if (!link.pid) {
          link.broken = true;
        }
      });
    });

    return dict;
  },

  convert: function() {
    var storyData = document.getElementsByTagName("tw-storydata")[0];
    var json = JSON.stringify(Twison.convertStory(storyData), null, 2);
    document.getElementById("output").innerHTML = json;
  }
}

window.Twison = Twison;