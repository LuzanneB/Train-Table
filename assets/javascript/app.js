// firebase config

  var firebaseConfig = {
    apiKey: "AIzaSyDE57wrSDv44uhbsVs5ANPw5YULvw0Sca0",
    authDomain: "train-time-project-de786.firebaseapp.com",
    databaseURL: "https://train-time-project-de786.firebaseio.com",
    projectId: "train-time-project-de786",
    storageBucket: "train-time-project-de786.appspot.com",
    messagingSenderId: "629391072858",
    appId: "1:629391072858:web:e143fd82c45dbfdd"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//  get a reference to database service
var database=firebase.database();
// creat global variables
//   trainName, ....etc


// create on click for submit button:
$("#add-train").on("click",function(event){
  //   prevent form from reloading
  event.preventDefault();
// collect user input
trainName = $("#name-input").val().trim();
destination= $("#destination-input").val().trim();
firstTrain = $("#first-input").val().trim();
frequency = $("#frequency-input").val().trim();


// temporary object
var newTrain = {
  trainName: trainName,
  destination: destination,
  firstTrain: firstTrain,
  frequency: frequency,
}
//uploads new train data to database
database.ref().push(newTrain);

// logging all our info
console.log(newTrain.trainName);
console.log(newTrain.destination);
console.log(newTrain.firstTrain);
console.log(newTrain.frequency);

alert("new Train added");

// clear the form
$("#name-input").val("");
$("#destination-input").val("");
$("#first-input").val("");
$("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot){
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  // figure out momentjs calculations
  var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTrainConverted);
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  var remainder = diffTime % frequency;
  var minutesAway =  frequency - remainder;
  var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
  var firstTrainFormatted = moment(firstTrain, "HH:mm").format("HH:mm");

  // create new row

  var newRow= $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(firstTrainFormatted),
    $("<td>").text(frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway),
  );
// append new row to table
  $("#trainTable > tbody").append(newRow);

});

