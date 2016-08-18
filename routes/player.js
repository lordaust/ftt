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

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('player', { title: 'For The Title - The way online football manager is meant to be'});
});

// GET player details page with parameters
router.get('/:id', function(req, res){
    var pid = req.params.id;
    function getPlayer() {
        var conn = new sql.Connection(dbConfig);

        conn.connect().then(function () {
            var req = new sql.Request(conn);
            req.query("SELECT * FROM dbo.player WHERE playerid = " + pid)
                .then(function (recordset) {
                    var data = recordset[0];

                    res.render('player', {
                        player_id: pid,
                        player_club: data.clubid,
                        player_firstname: data.firstname,
                        player_surname:data.surname,
                        player_skill: data.overall,
                        player_age: data.age,
                        player_value: '2.278.987',
                        player_position: data.position,
                        player_control: data.control,
                        player_mastery: data.mastery,
                        player_physical: data.physical,
                        player_mental: data.mental,
                        player_closetouch: data.closetouch,
                        player_widetouch: data.widetouch,
                        player_defensive: data.defensive,
                        player_offensive: data.offensive,
                        player_physique: data.physique,
                        player_swiftness: data.swiftness,
                        player_placement: data.placement,
                        player_intelligence: data.intelligence
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
    getPlayer();
    console.log('Da kjør vi');
});

module.exports = router;
