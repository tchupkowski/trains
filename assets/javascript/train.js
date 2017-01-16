
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD1FRK8r-CeYIFsEJ16h2pV7GQtwY4gKWQ",
    authDomain: "train-schedule2.firebaseapp.com",
    databaseURL: "https://train-schedule2.firebaseio.com",
    storageBucket: "train-schedule2.appspot.com",
    messagingSenderId: "1016117392378"
  };
  firebase.initializeApp(config);


// Get a reference to the database service
  var database = firebase.database();

//initial values 
// var trainName = "Hogwarts Express";
// var destination = "Hogsmeade Station";
//var frequency = 1;
// var nextArrival = 1;
// var minutesAway = 1;
//var firstTrainTime = 900;  


 // Click Button changes what is stored in firebase
 $("#submit-button").on("click", function() {

	// Get inputs
	trainName = $("#inputTrainName").val().trim();
	destination = $("#inputDestination").val().trim();
	firstTrainTime = $("#inputFirstTrainTime").val().trim();
	frequency = $("#inputFrequency").val().trim();

  // //figuure out minutes until next train arrival 
  // var firstTrain = moment(firstTrainTime, "hh:mm").subtract(1, "years");
  // //var currentTime = moment();
  // var diffTime = moment().diff(moment(firstTrain), "minutes");
  // var tRemainder = diffTime % frequency;
  // minutesAway = frequency - tRemainder;
  // console.log("minutesAway is " + minutesAway);
  // var nextArrival = moment().add(minutesAway, "minutes");
  // console.log("current time is " + moment());
  // console.log("next Arrival is " + nextArrival);

  

  
  // Change what is saved in firebase
    //database.ref().set({
    var newTrain = database.ref().push();
    newTrain.set({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency 
    });

  //clear forms
    $("#inputTrainName").val("");
    $("#inputDestination").val("");
    $("#inputFirstTrainTime").val("");
    $("#inputFrequency").val("");

  // Prevent the page from refreshing
    return false;
});


// When changes occurs it will print them to console and html
    // database.ref().on("value", function(snapshot) {

    //   // Print the initial data to the console.
    //   console.log(snapshot.val());

    //   // Log the value of the various properties
    //   console.log(snapshot.val().trainName);
    //   console.log(snapshot.val().destination);
    //   console.log(snapshot.val().firstTrainTime);
    //   console.log(snapshot.val().frequency);
    // });

database.ref().on("child_added", function(snapshot) {

  // Log everything that's coming out of snapshot
  console.log(snapshot.val().trainName);
  console.log(snapshot.val().destination);
  //console.log(snapshot.val().email);
  console.log(snapshot.val().firstTrainTime);
  console.log(snapshot.val().frequency );
  //console.log(snapshot.val().joinDate);

  //figuure out minutes until next train arrival 
  var firstTrain = moment(snapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
  console.log("first train math " + firstTrain);  
  var diffTime = moment().diff(moment(firstTrain), "minutes");
  console.log("diffTime is" + diffTime);
  var tRemainder = diffTime % snapshot.val().frequency;
  console.log("remainder is " + tRemainder);
  var minutesAway = snapshot.val().frequency - tRemainder;
  console.log("minutesAway is " + minutesAway);
  var nextArrival = moment().add(minutesAway, "minutes");
  console.log("current time is " + moment());
  console.log("next Arrival is " + nextArrival);

  // append train data to the table 
    $("#trainTableData").append("<tr><td>" + snapshot.val().trainName +
    "</td><td>" + snapshot.val().destination +
    " </td><td> " + snapshot.val().frequency +
    " </td><td> " + moment(nextArrival).format("hh:mm") + " </td><td> " + minutesAway + "</td></tr>");


// If any errors are experienced, log them to console.
}), function(errorObject) {
  console.log("The read failed: " + errorObject.code);
  };