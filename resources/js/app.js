/* JSON Object to hold data for tiles to be used */
var animals = [
    {
      'id': 1,
      'name': 'Cat',
      'image': 'resources/images/Animals/cat.png',
      'sound':'resources/sounds/animals/cat.wav'
    },
    {
      'id': 2,
      'name': 'Chicken',
      'image': 'resources/images/Animals/chicken.png',
      'sound':'resources/sounds/animals/cat.wav'
    },
    {
      'id': 3,
      'name': 'Cow',
      'image': 'resources/images/Animals/cow.png',
      'sound':'resources/sounds/animals/cow.wav'
    },
    {
      'id': 4,
      'name': 'Dog',
      'image': 'resources/images/Animals/dog.png',
      'sound':'resources/sounds/animals/dog.wav'
    },
    {
      'id': 5,
      'name': 'Duck',
      'image': 'resources/images/Animals/duck.png',
      'sound':'resources/sounds/animals/duck.wav'
    },
    {
      'id': 6,
      'name': 'Elephant' ,
      'image': 'resources/images/Animals/elephant.png',
      'sound':'resources/sounds/animals/elephant.wav'
    },
    {
      'id': 7,
      'name': 'Farmer',
      'image': 'resources/images/Animals/farmer.png',
      'sound':'resources/sounds/animals/farmer.wav'
    },
    {
      'id': 8,
      'name': 'Goat',
      'image': 'resources/images/Animals/goat.png',
      'sound':'resources/sounds/animals/goat.wav'
    },
    {
      'id': 9,
      'name': 'Gorilla',
      'image': 'resources/images/Animals/gorilla.png',
      'sound':'resources/sounds/animals/gorilla.wav'
    },
    {
      'id': 10,
      'name': 'Lion',
      'image': 'resources/images/Animals/lion.png',
      'sound':'resources/sounds/animals/lion.wav'
    },
    {
      'id': 11,
      'name': 'Pig',
      'image': 'resources/images/Animals/pig.png',
      'sound':'resources/sounds/animals/pig.wav'
    },
    {
      'id': 12,
      'name': 'Sheep',
      'image': 'resources/images/Animals/sheep.png',
      'sound':'resources/sounds/animals/sheep.wav'
    },
    {
      'id': 13,
      'name': 'Swan',
      'image': 'resources/images/Animals/swan.png',
      'sound':'resources/sounds/animals/cat.wav'
    },
    {
      'id': 14,
      'name': 'Zebra' ,
      'image': 'resources/images/Animals/zebra.png',
      'sound':'resources/sounds/animals/zebra.wav'
    },
      {
      'id': 15,
      'name': 'Crow' ,
      'image': 'resources/images/Animals/crow.png',
      'sound':'resources/sounds/animals/crow.wav'
    }
  ];
var christmas = [
    {
      'id': 1,
      'name': 'Bulb',
      'image': 'resources/images/Christmas/Bulb.png'
    },
    {
      'id': 2,
      'name': 'CandyCane',
      'image': 'resources/images/Christmas/CandyCane.png'
    },
    {
      'id': 3,
      'name': 'Elf',
      'image': 'resources/images/Christmas/Elf.png'
    },
    {
      'id': 4,
      'name': 'Garland',
      'image': 'resources/images/Christmas/Garland.png'
    },
    {
      'id': 5,
      'name': 'Gingerbread House',
      'image': 'resources/images/Christmas/GingerbreadHouse.png'
    },
    {
      'id': 6,
      'name': 'Gingerbread Man' ,
      'image': 'resources/images/Christmas/GingerbreadMan.png'
    },
    {
      'id': 7,
      'name': 'Mistletoe',
      'image': 'resources/images/Christmas/Mistletoe.png'
    },
    {
      'id': 8,
      'name': 'Present',
      'image': 'resources/images/Christmas/Present.png'
    },
    {
      'id': 9,
      'name': 'Rudolph',
      'image': 'resources/images/Christmas/Rudolph.png'
    },
    {
      'id': 10,
      'name': 'Santa',
      'image': 'resources/images/Christmas/Santa.png'
    },
    {
      'id': 11,
      'name': 'Santa\'s Hat',
      'image': 'resources/images/Christmas/SantaHat.png'
    },
    {
      'id': 12,
      'name': 'Sleigh',
      'image': 'resources/images/Christmas/Sleigh.png'
    },
    {
      'id': 13,
      'name': 'Snowflake',
      'image': 'resources/images/Christmas/Snowflake.png'
    },
    {
      'id': 14,
      'name': 'Stocking' ,
      'image': 'resources/images/Christmas/Stocking.png'
    },
      {
      'id': 15,
      'name': 'Tree' ,
      'image': 'resources/images/Christmas/Tree.png'
    }
  ];

  var backHome = function(){
    window.location.replace('index.html');
  }
  var cards=window[localStorage.getItem('selectedPack')];
  
  var Tile = function(data) {
    this.id = data.id;
    this.name = ko.observable(data.name);
    this.image = ko.observable(data.image);
    this.sound = data.sound;
    this.matched = ko.observable(false);
    this.imageVisible = ko.observable(false);

    // Determine if you show the tile image side or the back of tile
    this.imageUrl = ko.computed(function() {
      if (this.imageVisible()) {
        return this.image;
      } else {
        return 'resources/images/question.png';
      }
    }, this);
  };

  var ViewModel = function() {
    var self = this;

    // Array to hold tile objects
    this.tileList = ko.observableArray([]);

    /* The amount of tiles (not including their matching tile)
       that can be used in each game.*/
    this.NUM_TILES = 8;

    // The amount of matches left to find
    this.matchesLeft = ko.observable(this.NUM_TILES);

    // The amount of turns player has taken
    this.turnsTaken = ko.observable(0);

    // Hold the two tiles the player picks each turn
    this.pickedTile1 = ko.observable();
    this.pickedTile2 = ko.observable();

    var highscoreInt;
    var highscoreString = localStorage.getItem('highscore');
    if (highscoreString == null) {
      highscoreInt = 0;
    } else {
      highscoreInt = parseInt(highscoreString);
    }

    // The highest score
    this.highscore = ko.observable(highscoreInt);

    // Sets the highscore to a specific value
    this.setHighscore = function(value) {
      self.highscore(value);
      localStorage.setItem('highscore', self.highscore());
    }

    /* Instantiate tiles. When calling, pass the name of the
       JSON object containing the tiles to use.*/
    this.addTiles = function(tiles) {
      tiles.forEach(function(tileItem) {
        self.tileList.push(new Tile(tileItem));
      });
  };

    /* Add/instantiate matching tiles for the tiles that will be used
       in a game.*/
    this.addMatchingTiles = function(tiles) {
      var validTileIds = _.pluck(self.tileList(), 'id');
      tiles.forEach(function(tileItem) {
        if (_.contains((validTileIds), tileItem.id)) {
          self.tileList.push(new Tile(tileItem));
        }
      });
    };

    // Shuffle tiles in tileList array
    this.shuffleTiles = function() {
     self.tileList(_.shuffle(self.tileList()));
    };

    /* Remove extra tiles that are not needed since you
       should have no more than self.NUM_TILES tiles to play a
       game. Intended to be called after shuffleTiles() so
       if there are more than self.NUM_TILES tiles, the tiles
       you play the game with each time can vary.*/
    this.removeExtraTiles = function() {
      self.tileList.splice(self.NUM_TILES);
    };

    // Toggles tile visibility
    this.toggleVisibility = function(tile) {
      tile.imageVisible(!tile.imageVisible());
    };

    /* This function is called when the player clicks on a tile. It determines
       if the player is selecting the first or second tile. At the appropriate time,
       it sets the first and second tiles, displays the images,  and runs a function
       depending on if the tiles match or not.*/
    this.pickTile = function(tile) {
       if(typeof self.pickedTile1() === 'undefined') {
        self.pickedTile1(tile);
        self.toggleVisibility(self.pickedTile1());
      } else if (tile !== self.pickedTile1() && typeof self.pickedTile2() === 'undefined') {
          self.pickedTile2(tile);
          self.turnsTaken(self.turnsTaken() + 1);
          self.toggleVisibility(self.pickedTile2());
          if (self.pickedTile1().id === self.pickedTile2().id) {
            self.matchFound();
          } else {
            self.noMatchFound();
          }
      }
    };

    /* This function is called by pickTile() if player selected two matching tiles.
       It shows the tiles for 1.5 seconds and the turn is over. It calls initializeTurn()
       to start the next turn.*/
    this.matchFound = function() {
      setTimeout(function(){
          var audio;
          audio = new Audio(self.pickedTile2().sound);
          audio.play();
      self.pickedTile1().matched(true);
      self.pickedTile2().matched(true);
      self.matchesLeft(self.matchesLeft() - 1);
      if(self.matchesLeft() == 0){
        if(self.turnsTaken() < self.highscore() || self.highscore() == 0) {
          self.setHighscore(self.turnsTaken());
        }
        audio = new Audio('resources/sounds/cheer.wav');
        audio.play();
      }
        self.toggleVisibility(self.pickedTile1());
        self.toggleVisibility(self.pickedTile2());
        self.initializeTurn();
      }, 1500);
    };

    /* This function is called by pickTile() if player selected two tiles that do not match.
       The tiles will be visible for 2.2 seconds and then "turned over" which hides the image.*/
    this.noMatchFound = function() {
      setTimeout(function(){
        self.toggleVisibility(self.pickedTile1());
        self.toggleVisibility(self.pickedTile2());
        self.initializeTurn();
      }, 2200);

    };

    // Called by matchFound() or noMatchFound() to reset variables for the next turn.
    this.initializeTurn = function() {
      self.pickedTile1(undefined);
      self.pickedTile2(undefined);
    };

    /* Initialize Game. First, instantiate tiles, then shuffle tiles before removing extra
       tiles if the are more tiles intantiated than self.NUM_TILES. Add matching tiles for
       the tiles to be used, then shuffle the tiles again.*/
    this.initializeGame = function() {
      self.addTiles(cards);
      self.shuffleTiles();
      if (self.tileList().length > self.NUM_TILES) {
        self.removeExtraTiles();
      }
      self.addMatchingTiles(cards);
      self.shuffleTiles();
    };

    // Reset the game. Called when player clicks the "Play Again" button.
    this.playAgain = function() {
      self.matchesLeft(self.NUM_TILES);
      self.turnsTaken(0);
      self.tileList.removeAll();
      self.initializeGame();
      self.initializeTurn();
    };

    self.initializeGame();
  };

  ko.applyBindings(new ViewModel());
