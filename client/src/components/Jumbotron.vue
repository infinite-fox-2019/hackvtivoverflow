<template>
  <!-- <div class="jumb">
      <div class="jumb-content">
          <h1 class="ban-text">We love people who code</h1>
          <div class="p-box">
              <p class="paragraph">We build products that empower developers and connect them to solutions that enable productivity, growth, and discovery.</p>
          </div>
      </div>
  </div> -->
  <div id="parallax-world-of-ugg">
    <section>
        <div class="parallax-one">
        <h2>We love people who code</h2>
        <p style="font-size:20px;">We build products that empower developers and connect them to solutions that enable productivity, growth, and discovery.</p>
        </div>
    </section>

    <section>
    <div class="block sec-1">
        <div class="jumb-content">
            <h1 class="ban-text">For developers, by developers</h1>
            <div class="p-box">
                <p class="paragraph">We build products that empower developers and connect them to solutions that enable productivity, growth, and discovery.</p>
            </div>
        </div>
    </div>
    </section>

    <section>
    <div class="parallax-two">
        <h2>Questions are everywhere, answers are on Overflow</h2>
    </div>
    </section>

    <section>
    <div class="block sec-1">
        <div class="jumb-content">
            <h1 class="ban-text">For developers, by developers</h1>
            <div class="p-box">
                <p class="paragraph">The best part about being alone is that you really don't have to answer to anybody. You do what you want.</p>
            </div>
        </div>
    </div>
    </section>

    <section>
    <div class="parallax-three">
        <h2>Learn and grow with Overflow</h2>
    </div>
    </section>

    <section>
    <div class="block sec-1">
        <div class="block sec-1">
            <div class="jumb-content">
                <h1 class="ban-text">For developers, by developers</h1>
                <div class="p-box">
                    <p class="paragraph">We build products that empower developers and connect them to solutions that enable productivity, growth, and discovery.</p>
                </div>
            </div>
        </div>
    </div>
    </section>

    </div>
</template>

<script>
export default {
  name: 'Jumbotron'
}
</script>

<style>
.box {
    box-shadow: 2px 2px 2px black;

}
.sec-1 {
    height: 60vh !important;
}
/* .jumb {
    height: 100vh;
    background-image: url('../assets/bg.jpg');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
} */
/* .jumb-content {
    padding: 2vh 2vw !important;
} */
.ban-text {
    font-size: 10px !important;
    font-weight: bold !important;
    color: #242729 !important;
    font-size: 4vw !important;
    text-shadow: 2px 2px 2px white !important;
}
.paragraph {
    text-align: center !important;
    font-size: 20px !important;
}
.p-box {
    width: 35vw !important;
    margin: 4vh auto !important;
}
/* --------- */

@import url(https://fonts.googleapis.com/css?family=Oswald:300,400,700);
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic);

/* Override UGG site */
#main {width: 100%; padding:0;}
.content-asset p {margin:0 auto;}
.breadcrumb {display:none;}

/* Helpers */
/**************************/
.margin-top-10 {padding-top:10px;}
.margin-bot-10 {padding-bottom:10px;}

/* Typography */
/**************************/
#parallax-world-of-ugg h1 {font-family:'Oswald', sans-serif; font-size:24px; font-weight:400; text-transform: uppercase; color:black; padding:0; margin:0;}
#parallax-world-of-ugg h2 {font-family:'Oswald', sans-serif; font-size:70px; letter-spacing:10px; text-align:center; color:white; font-weight:400; text-transform:uppercase; z-index:10; opacity:.9; text-shadow: 2px 2px 2px black}
#parallax-world-of-ugg h3 {font-family:'Oswald', sans-serif; font-size:14px; line-height:0; font-weight:400; letter-spacing:8px; text-transform: uppercase; color:black;}
#parallax-world-of-ugg p {font-family:'Source Sans Pro', sans-serif; font-weight:400; font-size:14px; line-height:24px;}
.first-character {font-weight:400; float: left; font-size: 84px; line-height: 64px; padding-top: 4px; padding-right: 8px; padding-left: 3px; font-family: 'Source Sans Pro', sans-serif;}

.sc {color: #3b8595;}
.ny {color: #3d3c3a;}
.atw {color: #c48660;}

/* Section - Title */
/**************************/
#parallax-world-of-ugg .title {background: white; padding: 60px; margin:0 auto; text-align:center;}
#parallax-world-of-ugg .title h1 {font-size:35px; letter-spacing:8px;}

/* Section - Block */
/**************************/
#parallax-world-of-ugg .block {background: white; padding: 60px; width:820px; margin:0 auto;}
#parallax-world-of-ugg .block-gray {background: #f2f2f2;padding: 60px;}
#parallax-world-of-ugg .section-overlay-mask {position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: black; opacity: 0.70;}

/* Section - Parallax */
/**************************/
#parallax-world-of-ugg .parallax-one {padding-top: 200px; padding-bottom: 200px; overflow: hidden; position: relative; width: 100%; background-image: url('../assets/bg.jpg'); background-attachment: fixed; background-size: cover; -moz-background-size: cover; -webkit-background-size: cover; background-repeat: no-repeat; background-position: top center;}
#parallax-world-of-ugg .parallax-two {padding-top: 200px; padding-bottom: 200px; overflow: hidden; position: relative; width: 100%; background-image: url('../assets/bg2.jpg'); background-attachment: fixed; background-size: cover; -moz-background-size: cover; -webkit-background-size: cover; background-repeat: no-repeat; background-position: center center;}
#parallax-world-of-ugg .parallax-three {padding-top: 200px; padding-bottom: 200px; overflow: hidden; position: relative; width: 100%; background-image: url('../assets/bg3.jpg'); background-attachment: fixed; background-size: cover; -moz-background-size: cover; -webkit-background-size: cover; background-repeat: no-repeat; background-position: center center;}

/* Extras */
/**************************/
#parallax-world-of-ugg .line-break {border-bottom:1px solid black; width: 150px; margin:0 auto;}

/* Media Queries */
/**************************/
@media screen and (max-width: 959px) and (min-width: 768px) {
  #parallax-world-of-ugg .block {padding: 40px; width:620px;}
}
@media screen and (max-width: 767px) {
  #parallax-world-of-ugg .block {padding: 30px; width:420px;}
  #parallax-world-of-ugg h2 {font-size:30px;}
  #parallax-world-of-ugg .block {padding: 30px;}
  #parallax-world-of-ugg .parallax-one, #parallax-world-of-ugg .parallax-two, #parallax-world-of-ugg .parallax-three {padding-top:100px; padding-bottom:100px;}
}
@media screen and (max-width: 479px) {
  #parallax-world-of-ugg .block {padding: 30px 15px; width:290px;}
}
</style>
