// Initialize Firebase
var config = {
    apiKey: "AIzaSyB-pKEvyVnFyC5rLyBvHGtjw2AmLapA49g",
    authDomain: "train-schedule-10663.firebaseapp.com",
    databaseURL: "https://train-schedule-10663.firebaseio.com",
    storageBucket: "train-schedule-10663.appspot.com",
    messagingSenderId: "542168464328"
};
  
firebase.initializeApp(config); 

// Get a reference to the database service
  var database = firebase.database();

//initial values 
var trainName = "";
var destination = "";
var frequency = 0;
var nextArrival = 1111;
var minutesAway = 11;
var firstTrainTime = 900;  


 // Click Button changes what is stored in firebase
 $("#submit-button").on("click", function() {

	// Get inputs
	trainName = $("#inputTrainName").val().trim();
	destination = $("#inputDestination").val().trim();
	firstTrainTime = $("#inputFirstTrainTime").val().trim();
	frequency = $("#inputFrequency").val().trim();

  var firstTrain = moment(firstTrainTime);

  
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
    database.ref().on("value", function(snapshot) {

      // Print the initial data to the console.
      console.log(snapshot.val());

      // Log the value of the various properties
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().firstTrainTime);
      console.log(snapshot.val().frequency);
    });

    database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      //console.log(childSnapshot.val().email);
      console.log(childSnapshot.val().firstTrainTime);
      console.log(childSnapshot.val().frequency );
      //console.log(childSnapshot.val().joinDate);

      // full list of items to the well
      $("#trainTableData").append("<tr><td>" + childSnapshot.val().trainName +
        "</td><td>" + childSnapshot.val().destination +
        " </td><td> " + childSnapshot.val().firstTrainTime +
        " </td><td> " + childSnapshot.val().frequency + "</td></tr>");


      // If any errors are experienced, log them to console.
    }), function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    };