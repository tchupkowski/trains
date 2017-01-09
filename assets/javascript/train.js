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

	 // Change what is saved in firebase
      database.ref().set({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
      });

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


      // Change the HTML
      //$("#displayed-data").html(snapshot.val().name + " | " + snapshot.val().age + " | " + snapshot.val().phone);

      // If any errors are experienced, log them to console.
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });