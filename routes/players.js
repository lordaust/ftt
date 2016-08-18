/**
 * Created by alex on 03.08.2016.
 */
var express = require('express');
var router = express.Router();
var sql = require('mssql');

// sqlserver connection details should probably go somewhere else
var dbConfig = {
    server: "localhost\\MSSQLSERVER",
    database: "distribution_database",
    user: "sa",
    password: "u6Axjd3v",
    port: 1433
};

/* GET player squad page. */
router.get('/:cid', function(req, res, next) {
    var cid = req.params.cid;

    console.log("ClubId: " +cid);

    function getPlayersFromClub() {
        var conn = new sql.Connection(dbConfig);

        conn.connect().then(function () {
            var req = new sql.Request(conn);
            req.query("SELECT * FROM dbo.player WHERE clubid = " + cid + "ORDER BY position ASC, age DESC, overall DESC")
                .then(function (recordset) {
                    var data = recordset;
                    res.render('players', {
                        playerdata: data
                    });


                   conn.close();

                })
                .catch(function (err) {
                    console.log(err);
                    conn.close();
                });
        })
            .catch(function (err) {
                console.log(err);
            });
    }
    getPlayersFromClub();
    console.log('Da kjør vi');
});

module.exports = router;
