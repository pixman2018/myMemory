'use-strict';

$(window).ready(function(){

  (function(){



    class Memo {
      /**
       * [constructor description]
       */
      constructor()
      {
        /**
        * @param string   pattern           [back of the cards]
        * @param string   name              [the name of the player]
        * @param string   countMemo         [number of memo card]
        * @param array    numberArray       [number of cards in an array]
        * @param array    randomArray       [random number of cards in an array]
        * @param integer  showMemoField     [number of cards that are visible]
        * @param string   currentImage      [active image by click]
        * @param string   $currentTarget    [active target from image by click]
        * @param string   $currentTarget2   [second false image]
        * @param string   firstClick        [taget vom first image click]
        * @param string   secondClick       [taget vom second image click]
        * @param string   $firstClickValue  [first image value of clicked]
        * @param string   $lastClickValue   [last image value by clicked]
        */
        this.pattern            = 'images/memo/pattern.jpg';
        this.name               = '';
        this.countMemo          = $('#count').val();
        this.numberArray        = [];
        this.randomArray        = [];
        this.showMemoField      = 0;
        this.currentImage       = '';
        this.$currentTarget     = '';
        this.$currentTarget2    = '';
        this.$firstClick        = '';
        this.$secondClick       = '';
        this.$firstClickValue   = '';
        this.$lastClickValue    = '';
        this.cardOpen           = 0;

        /**
         * start the methoden
         */
        this.startSetting();
        this.clearGame();
        /**
         * [The game is started for the first time]
         */
        if ( $('#go').hasClass('active') )
        {
          //this.newSGametart();
        } else
        {
          this.startCreateMemo();
        }
        $('#go').addClass('active');

      }

      /**
       * [start the setting for a new memo game]
       * [register the range event]
       * @return {[type]} [description]
       */
      startSetting()
      {
        $('#count').on('input', function(){
          $('.output-range').text( memo.getCount() );
        });

        $('.background').show();
        if (!this.name)
        {
          $('.setting-menu').removeClass('hidden');
          $('.output-range').text( this.getCount() );

          $('#settingGame').on('click', function(){
            this.settingGame();
            this.setNumberArray();
            this.setRandom();
            this.createMemoField();
          }.bind(this));
        }
      }
      /**
      * [game pref]
      * [if namefield empty then is the gamer name Anonums]
      */
      settingGame()
      {
        this.name = $('#username').val() != '' ? $('#username').val() : 'Anonums';
        this.countMemo = $('#count').val();
        $('.setting-menu').addClass('hidden');
        $('.background').hide();
        this.readHeader()
      }

      /**
      * [get the value from input#count]
      */
      getCount()
      {
        return $('#count').val() + ' Karten';
      }

      /**
      * [create the header text]
      */
      readHeader()
      {
        $('h1').after('<p> - es spielt <b>' + this.name + '</b> mit <b>' + this.countMemo + '</b> Karten.</p>')
      }
      /**
       * [newGameStart started with a restart of the game]
       * @return {[type]} [description]
       */
      newGameStart()
      {
        console.log('new')
      }
      /**
       * [startCreateMemo starts at the first start]
       * @return {[type]} [description]
       */
      startCreateMemo()
      {
        console.log('start')

      }

      /**
       * [setNumberArray create a numberArray whose length is the number of cards]
       * @return {[array]} [numberArray]
       */
      setNumberArray()
      {
        for (var i = 0; i < this.countMemo ; i++)
        {
          this.numberArray.push(i);
        }
        this.numberArray = this.numberArray.concat(this.numberArray);
      }
      /**
       * [setRandom create a Random array from the number number array]
       * @return {[array]} [randomArray]
       */
      setRandom()
      {
        let arrayLength = this.numberArray.length;
        let arrguments = [];
        let randomNumber;

        for(var j = arrayLength ; j>0 ; j-- )
        {
          randomNumber = Math.floor((Math.random() * (this.numberArray.length)));
          arrguments.push( this.numberArray[randomNumber] );
          this.numberArray.splice(randomNumber, 1);
        }

        this.randomArray = arrguments;
      }
      /**
       * [createMemoField]
       * [froms the memory cards and overwrites the placeholders ]
       * [they are marked width "__"]
       * [append the cards into the DOM and register the click event]
       * @return {[string]} [showMemoField number of the visited cards]
       */
      createMemoField()
      {
        let html = '<div class="item"><figure class="memo-item"><img src="images/memo/pattern.jpg" alt="" class="cards" data-no="__no__" data-random="__random__"/></figure></div>';
        let htmlOutput;

        $('.game-area').hide()
        for (var i = 0; i < (this.countMemo ) * 2; i++)
        {
          htmlOutput ? htmlOutput += html.replace('__no__', i).replace('__random__', this.randomArray[i] ) : htmlOutput = html.replace('__no__', i).replace('__random__', this.randomArray[i] );
        }

        $('.game-area')
          .append(htmlOutput)
          .show('slow');



          $('.cards').on('click', function( event ){

              this.cardOpen ++;
              if (this.cardOpen <= 2)
              {
                var $target = $(event.target);

                this.currentImage     = 'images/memo/img_' + $target.attr('data-random') + '.jpg';
                this.$currentTarget    = $target;
                this.rotate();
              } else
              {
                this.cardOpen = 0;
              }

          }.bind(this));

        // set the image of the canvas
        this.showMemoField = this.randomArray.length;
      }

      rotate()
      {

        if ( !this.$currentTarget.hasClass('rotate380') )
        {
          this.chanceImage();

          // register the click
          if (this.$firstClick  == '') {
            this.$firstClick = this.$currentTarget;
          }
          else {

            this.$secondClick = this.$currentTarget;
          }

          if ( ( this.$firstClick != '' ) && ( this.$secondClick != '' ) )
          {
            this.check();
          }

        }
        else {
          console.log('memo ?');
          //Memory.startCreateMemory( 'images/pattern.jpg', $(target) );
          //this.startCreateMemo(  );
        }

      }

      check()
      {
        let firstRandomCurrent = this.$firstClick.attr('data-random');
        let lastRandomCurrent = this.$secondClick.attr('data-random');
        let $firstValue = this.$firstClick;
        let $lastValue =  this.$secondClick;


        if (firstRandomCurrent == lastRandomCurrent)
        {
          this.fadeOut();
          this.$firstClick = '';
          this.$secondClick = '';
        } else {

          this.$firstClick = '';
          this.$secondClick = '';
          setTimeout( function(){

            this.currentImage = this.pattern;
            this.$currentTarget = $firstValue;
            this.$currentTarget2 = $lastValue;
            this.chanceImage();

          }.bind(this), 1000);

        }

      }

      fadeOut()
      {

        //$firstClickValue, $lastClickValue
        // console.log(this.$firstClick)
        this.$firstClick .parent('figure').fadeOut(2000);
        this.$secondClick.parent('figure').fadeOut(2000);

        this.showMemoField -= 2;
        this.finish();
      }

      finish()
      {
        if (this.showMemoField == 0)
        {

            let html = '<div id="overlay" class="hiden"><div class="output"><div class="close">X</div></div></div>';
            let text = '<h3>Sie haben das Spiel gewonnen!</h3>';
            $('body').prepend(html);
            $('#overlay .output').append(text);

            setTimeout(function(){
              $('#overlay').removeClass('hiden');
            }, 1500);

            $('.game-area').hide('slow');

            $('.close').on('click', function(){
              
              $('#overlay').addClass('hidden');
            });

            this.clearGame();
          }
      }

      chanceImage()
      {

        setTimeout(function(){
          if (this.$currentTarget2)
          {
            // console.log(this.$currentTarget2);
            this.$currentTarget2.attr('src', this.currentImage);
            this.$currentTarget2.toggleClass('rotate380');
            this.$currentTarget2 = '';
          }
          this.$currentTarget.attr('src', this.currentImage);
        }.bind(this), 300);
        this.$currentTarget.toggleClass('rotate380');

      }

      clearGame()
      {
        this.numberArray        = [];
        this.randomArray        = [];
        this.showMemoField      = 0;
        this.currentImage       = '';
        this.$currentTarget     = '';
        this.$currentTarget2    = '';
        this.$firstClick        = '';
        this.$secondClick       = '';
        this.$firstClickValue   = '';
        this.$lastClickValue    = '';
      }

    }// class



    var memo;

    $('#go').on('click', function(){
      memo = new Memo();
      memo.start;
      console.log(memo)
    });



  })();



});
