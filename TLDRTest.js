"use strict"; 

var TLDR = require('./services/TLDR.js');
var RSSImporter = require('./services/RSSImporter.js');
var similarity = require("similarity");


var RSSImporter = RSSImporter.get('http://rss.cnn.com/rss/cnn_topstories.rss', function(posts) {

});

// var cnn = `'Theyre taking them from other countries. Theyre bringing them back to the United States," Trump said Wednesday outside one of his Florida resorts. "A nice change."
// Sprint confirmed the news in a statement saying the telecom company would "create or bring back to America" 5,000 jobs, mostly in customer care and sales. The announcement comes only a month after Trump helped get Carrier to keep 800 jobs in Indiana.
// Powered by SmartAsset.com "We are excited to work with President-elect Trump and his administration to do our part to drive economic growth and create jobs in the U.S.," said Sprint (S) CEO Marcelo Claure. He called it "critical" for business and government to work together.
// Earlier this year, however, Sprint cut 2,500 jobs at its call centers to save money.
// Related: How Trump got Carrier to stay
// On top of the Sprint jobs, Trump celebrated that "a new company" called OneWeb would hire 3,000 people. In total, Trump is taking credit now for about 9,000 jobs created or saved.
// Trump has vowed to be the "greatest jobs president that God ever created." He campaigned on saving U.S. jobs and jump starting the economy.
// "Companies are not going to leave the United States anymore without consequences," Trump said when he visited Carrier on December 1.
// Related: 5 stocks to buy in 2017
// OneWeb is a Florida startup that aims to provide Internet access to everyone from small satellites orbiting the Earth. The firm came to national attention after a Japanese firm, SoftBank, invested over $1 billion in it earlier this month.
// "These will be lots of skilled manufacturing jobs," Greg Wyler, CEO of OneWeb told CNNMoney, adding it was "nice to get a mention" from Trump.
// He said OneWeb plans to add the new jobs over the next four years. As an American entrepreneur, Wyler said high taxes are the biggest hurdle businessmen like him face. He hopes Trump lowers the tax rates.
// The jobs the president-elect heralded Wednesday were actually announced already. In early December, Masayoshi "Masa" Son, the CEO of SoftBank, stood by Trump and promised to invest billions in the U.S. and create 50,000 jobs. Sprint and OneWeb confirmed that these jobs are part of that 50,000 vow, since SoftBank has made significant investments in both companies.
// In early December, Trump claimed that Softbank would not have invested in the U.S. if Hillary Clinton had won the election.
// "Masa said he would never do this had we (Trump) not won the election!" Trump tweeted at the time. But SoftBank was making moves in the U.S. already, including talking to OneWeb before the election.'`

// var fox = `"\n    \n        \n        \n        \n            \n                President-elect Donald Trump announced Wednesday the addition of roughly 8,000 new jobs for Americans, including 5,000 that telecommunications giant Sprint will bring from “all around the world.”                \n                \n\n            \n                “They’re coming back to the United States, which is a nice change,” he said.                \n                \n\n            \n                Trump, who takes office January 20, said the other 3,000 jobs will be hires from a new company called One Web.                \n                \n\n            \n                Trump was elected in part on the promise to return to the United States jobs that American companies had moved overseas, in search of cheaper labor costs.                \n                \n\n            \n                Last month, he announced that Carrier would keep roughly 1,000 jobs in Indiana, after months of criticizing the air-conditioning corporation on the campaign trail for plans to move the jobs to Mexico.                \n                \n\n            \n                Trump spoke Wednesday from his Mar a Largo estate in Palm Beach, Florida.                \n                \n\n            \n                The wealthy businessman-turned politician also said he had a “nice” and “general” conversation earlier in the day with outgoing President Obama.                \n                \n\n            \n                Trump opposed the Obama administration’s move last week to allow the United Nations to pass a resolution condemning Israel for building more settlements in the disputed West Bank.                \n                \n\n            \n                He said Secretary of State John Kerry’s speech earlier Wednesday defending the administration’s U.N. decision “spoke for itself.”                \n                \n\n            \n                Trump, who in recent days has been especially critical of the U.N., also said that the international body “has tremendous potential but is not living up to itself.”                \n                \n\n            \n                Trump added he had help on the jobs deals from several people including Massayoshi Son, the chief executive officer for SoftBank of Japan, which owns Sprint.                \n                \n\n            \n                Trump has had previous business dealings with Son, whom he described on Wednesday as a “terrific guy.”                \n                \n\n            \n                                \n                \n\n            \n                                \n                \n\n            \n                                \n                \n\n            \n\n            \n                \n                    \n                \n                \n\n\n \n\n            \n        \n    \n"`

// //Trump has had previous business dealings with Son, whom he described on Wednesday as a “terrific guy. 'President-elect Donald Trump announced Wednesday the addition of roughly 8,000 new jobs for Americans, including 5,000 that telecommunications giant Sprint will bring from “all around the world. ”
// //“They’re coming back to the United States, which is a nice change,” he said. 

// //Trump, who takes office January 20, said the other 3,000 jobs will be hires from a new company called One Web. 

// var tldr = new TLDR('Trump declares victory: Sprint will create 5,000 U.S. jobs', cnn).getSummary();

// console.log(tldr);

// //In early December, Masayoshi "Masa" Son, the CEO of SoftBank, stood by Trump and promised to invest billions in the U.S.

// var simScore = similarity(cnn, `In early December, Masayoshi "Masa" Son, the CEO of SoftBank, stood by Trump and promised to invest billions in the U.S.`);

// console.log(simScore);