var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password1",
	database: "vmworksheet"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");

	var sql = "INSERT INTO test (id, name) VALUES ?";
	var data = [
		[ 2,"Tracey" ],
		[ 3, "John" ],
		[ 4, "Ralph" ],
		[ 5, "Thomas" ],
		[ 6, "Amy" ]
	];

	con.query(sql, [data], function (err, result) {
		if (err) throw err;
		console.log("Number of records inserted: " + result.affectedRows);
	});

});