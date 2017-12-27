const test = require('ava');
const Game = require('../lib/game');

test('should have score = 0 if no answer', t => {
    const game = new Game({ started_at: '2017-09-05T16:14:20.352Z', player: 'jdoe@xebia.fr' });
    t.deepEqual(game.detail,
        {
            player: 'jdoe@xebia.fr',
            questions: 0,
            started_at: '2017-09-05T16:14:20.352Z',
            score: 0,
            frames: [],
            bonuses: [],
            elapsed_time: 0,
            accuracy: 0,
        });
});

test('should have score = 100 if one good answer', t => {
    const game = new Game(
        {
            questions: 10,
            started_at: '2017-09-05T16:00:00.000Z',
            frames: [
                {
                    player_answer: 'id5',
                    valid_answer: 'id5',
                    answered_at: '2017-09-05T16:00:01.000Z',
                }
            ]
        });
    t.deepEqual(game.detail,
        {
            player: 'anonymous',
            questions: 10,
            started_at: '2017-09-05T16:00:00.000Z',
            score: 100,
            frames: [
                {
                    critical: false,
                    player_answer: 'id5',
                    valid_answer: 'id5',
                    answered_at: '2017-09-05T16:00:01.000Z',
                    score: 100,
                },
            ],
            bonuses: [],
            elapsed_time: 1,
            accuracy: 100,
        });
});

test('should have score = 0 if one bad answer', t => {
    const game = new Game(
        {
            questions: 10,
            started_at: '2017-09-05T16:00:00.000Z',
            frames: [
                {
                    player_answer: 'id4',
                    valid_answer: 'id5',
                    answered_at: '2017-09-05T16:00:01.000Z',
                }
            ]
        });
    t.deepEqual(game.detail,
        {
            player: 'anonymous',
            questions: 10,
            started_at: '2017-09-05T16:00:00.000Z',
            score: 0,
            frames: [{
                critical: false,
                player_answer: 'id4',
                valid_answer: 'id5',
                answered_at: '2017-09-05T16:00:01.000Z',
                score: 0,
            }],
            bonuses: [],
            elapsed_time: 1,
            accuracy: 0,
        });
});

test('should have NO MISS - PERFECT GAME bonus if game if finished and no miss hit', t => {
    const game = new Game(
        {
            questions: 2,
            started_at: '2017-09-05T16:00:00.000Z',
            frames: [
                {
                    player_answer: 'id5',
                    valid_answer: 'id5',
                    answered_at: '2017-09-05T16:00:01.000Z',
                },
                {
                    player_answer: 'id2',
                    valid_answer: 'id2',
                    answered_at: '2017-09-05T16:00:02.000Z',
                }
            ]
        });
    t.deepEqual(game.detail,
        {
            player: 'anonymous',
            questions: 2,
            started_at: '2017-09-05T16:00:00.000Z',
            score: 50200,
            frames: [
                {
                    critical: false,
                    player_answer: 'id5',
                    valid_answer: 'id5',
                    answered_at: '2017-09-05T16:00:01.000Z',
                    score: 100,
                },
                {
                    critical: false,
                    player_answer: 'id2',
                    valid_answer: 'id2',
                    answered_at: '2017-09-05T16:00:02.000Z',
                    score: 100,
                },
            ],
            bonuses: [
                {
                    type: 'NO_MISS',
                    score: 50000,
                },
            ],
            elapsed_time: 2,
            accuracy: 100,
        });
});

test('should have score = 600 because there is a CRITICAL HIT', t => {
    const game = new Game(
        {
            questions: 10,
            started_at: '2017-09-05T16:00:00.000Z',
            frames: [
                {
                    player_answer: 'id5',
                    valid_answer: 'id5',
                    answered_at: '2017-09-05T16:00:01.000Z',
                },
                {
                    player_answer: 'id9',
                    valid_answer: 'id9',
                    answered_at: '2017-09-05T16:00:02.000Z',
                },
                {
                    player_answer: 'id10',
                    valid_answer: 'id10',
                    answered_at: '2017-09-05T16:00:03.000Z',
                },
            ]
        });
    t.deepEqual(game.detail,
        {
            player: 'anonymous',
            questions: 10,
            started_at: '2017-09-05T16:00:00.000Z',
            score: 600,
            frames: [
                {
                    player_answer: 'id5',
                    valid_answer: 'id5',
                    answered_at: '2017-09-05T16:00:01.000Z',
                    score: 100,
                    critical: false,
                },
                {
                    player_answer: 'id9',
                    valid_answer: 'id9',
                    score: 100,
                    answered_at: '2017-09-05T16:00:02.000Z',
                    critical: false,
                },
                {
                    player_answer: 'id10',
                    valid_answer: 'id10',
                    score: 400,
                    critical: true,
                    answered_at: '2017-09-05T16:00:03.000Z',
                },
            ],
            bonuses: [],
            elapsed_time: 3,
            accuracy: 100,
        });
});

test('should have score = 46800', t => {
    const game = new Game(
        {
            "player": "Anonymous",
            "started_at": "2017-12-12T19:31:59.334Z",
            "questions": 155,
            "score": 331200,
            "frames": [{
                "answered_at": "2017-12-12T19:32:22.312Z",
                "player_answer": "Lionel Guez",
                "valid_answer": "Lionel Guez",
            }, {
                "answered_at": "2017-12-12T19:32:24.396Z",
                "player_answer": "Sergio Dos Santos",
                "valid_answer": "Sergio Dos Santos",
            }, {
                "answered_at": "2017-12-12T19:32:26.244Z",
                "player_answer": "Richard Mathis",
                "valid_answer": "Richard Mathis",
            }, {
                "answered_at": "2017-12-12T19:32:28.144Z",
                "player_answer": "Zahir Hamroune",
                "valid_answer": "Zahir Hamroune",
            }, {
                "answered_at": "2017-12-12T19:32:30.682Z",
                "player_answer": "Souhaib Guitouni",
                "valid_answer": "Souhaib Guitouni",
            }, {
                "answered_at": "2017-12-12T19:32:32.841Z",
                "player_answer": "Julien Bonachera",
                "valid_answer": "Julien Bonachera",
            }, {
                "answered_at": "2017-12-12T19:32:34.642Z",
                "player_answer": "Bastien Bonnet",
                "valid_answer": "Bastien Bonnet",
            }, {
                "answered_at": "2017-12-12T19:32:36.347Z",
                "player_answer": "Alexis Tessier",
                "valid_answer": "Alexis Tessier",
            }, {
                "answered_at": "2017-12-12T19:32:38.126Z",
                "player_answer": "Isabelle Roques",
                "valid_answer": "Marina Tracco",
            }, {
                "answered_at": "2017-12-12T19:32:41.339Z",
                "player_answer": "Vincent Segouin",
                "valid_answer": "Vincent Segouin",
            }, {
                "answered_at": "2017-12-12T19:32:43.977Z",
                "player_answer": "Yassir Sennoun",
                "valid_answer": "Yassir Sennoun",
            }, {
                "answered_at": "2017-12-12T19:32:46.153Z",
                "player_answer": "Thomas Simonnet",
                "valid_answer": "Thomas Simonnet",
            }, {
                "answered_at": "2017-12-12T19:32:48.231Z",
                "player_answer": "Gérôme Egron",
                "valid_answer": "Gérôme Egron",
            }, {
                "answered_at": "2017-12-12T19:32:50.201Z",
                "player_answer": "Fares Oueslati",
                "valid_answer": "Fares Oueslati",
            }, {
                "answered_at": "2017-12-12T19:32:52.070Z",
                "player_answer": "Stéphane Guedon",
                "valid_answer": "Stéphane Guedon",
            }, {
                "answered_at": "2017-12-12T19:32:53.591Z",
                "player_answer": "Anta Aidara",
                "valid_answer": "Anta Aidara",
            }, {
                "answered_at": "2017-12-12T19:32:57.868Z",
                "player_answer": "David Attali",
                "valid_answer": "David Attali",
            }, {
                "answered_at": "2017-12-12T19:32:59.624Z",
                "player_answer": "Morgane Eckert",
                "valid_answer": "Morgane Eckert",
            }, {
                "answered_at": "2017-12-12T19:33:01.882Z",
                "player_answer": "Clément Rochas",
                "valid_answer": "Clément Rochas",
            }, {
                "answered_at": "2017-12-12T19:33:04.006Z",
                "player_answer": "Bruno Bouchahoua",
                "valid_answer": "Bruno Bouchahoua",
            }, {
                "answered_at": "2017-12-12T19:33:06.530Z",
                "player_answer": "Fabien Mirault",
                "valid_answer": "Fabien Mirault",
            }, {
                "answered_at": "2017-12-12T19:33:09.020Z",
                "player_answer": "Renaud Chevalier",
                "valid_answer": "Renaud Chevalier",
            }, {
                "answered_at": "2017-12-12T19:33:10.647Z",
                "player_answer": "Tracy Anicet",
                "valid_answer": "Tracy Anicet",
            }, {
                "answered_at": "2017-12-12T19:33:13.004Z",
                "player_answer": "Moises Trelles",
                "valid_answer": "Moises Trelles",
            }, {
                "answered_at": "2017-12-12T19:33:14.987Z",
                "player_answer": "Sandra Pietrowska",
                "valid_answer": "Sandra Pietrowska",
            }, {
                "answered_at": "2017-12-12T19:33:17.752Z",
                "player_answer": "Géraud Beguin",
                "valid_answer": "Géraud Beguin",
            }, {
                "answered_at": "2017-12-12T19:33:19.336Z",
                "player_answer": "Jonathan Raffre",
                "valid_answer": "Jonathan Raffre",
            }, {
                "answered_at": "2017-12-12T19:33:22.212Z",
                "player_answer": "Dara Lim",
                "valid_answer": "Dara Lim",
            }, {
                "answered_at": "2017-12-12T19:33:24.146Z",
                "player_answer": "Benjamin Lacroix",
                "valid_answer": "Benjamin Lacroix",
            }, {
                "answered_at": "2017-12-12T19:33:27.043Z",
                "player_answer": "Javier Merchan",
                "valid_answer": "Javier Merchan",
            }, {
                "answered_at": "2017-12-12T19:33:29.189Z",
                "player_answer": "Dmytro Podyachiy",
                "valid_answer": "Dmytro Podyachiy",
            }, {
                "answered_at": "2017-12-12T19:33:30.665Z",
                "player_answer": "Pierre-Philippe Beauchemin",
                "valid_answer": "Pierre-Philippe Beauchemin",
            }, {
                "answered_at": "2017-12-12T19:33:32.806Z",
                "player_answer": "Olivier Marquet",
                "valid_answer": "Olivier Marquet",
            }, {
                "answered_at": "2017-12-12T19:33:35.286Z",
                "player_answer": "Sylvain Decout",
                "valid_answer": "Sylvain Decout",
            }, {
                "answered_at": "2017-12-12T19:33:36.889Z",
                "player_answer": "Ingrid Aniotz",
                "valid_answer": "Ingrid Aniotz",
            }, {
                "answered_at": "2017-12-12T19:33:42.528Z",
                "player_answer": "Edouard Siha",
                "valid_answer": "Edouard Siha",
            }, {
                "answered_at": "2017-12-12T19:33:44.583Z",
                "player_answer": "Julien Simon",
                "valid_answer": "Julien Simon",
            }, {
                "answered_at": "2017-12-12T19:33:46.382Z",
                "player_answer": "Simone Civetta",
                "valid_answer": "Simone Civetta",
            }, {
                "answered_at": "2017-12-12T19:33:49.171Z",
                "player_answer": "Laurent Seng",
                "valid_answer": "Laurent Seng",
            }, {
                "answered_at": "2017-12-12T19:33:51.873Z",
                "player_answer": "Damien Baron",
                "valid_answer": "Damien Baron",
            }, {
                "answered_at": "2017-12-12T19:33:53.417Z",
                "player_answer": "Jeremy Pinsolle",
                "valid_answer": "Jeremy Pinsolle",
            }, {
                "answered_at": "2017-12-12T19:33:55.481Z",
                "player_answer": "Nicolas Dechandon",
                "valid_answer": "Nicolas Dechandon",
            }, {
                "answered_at": "2017-12-12T19:33:57.123Z",
                "player_answer": "Anthony Giniers",
                "valid_answer": "Anthony Giniers",
            }, {
                "answered_at": "2017-12-12T19:33:58.992Z",
                "player_answer": "Sarah Buisson",
                "valid_answer": "Sarah Buisson",
            }, {
                "answered_at": "2017-12-12T19:34:00.870Z",
                "player_answer": "Sylvain Lequeux",
                "valid_answer": "Sylvain Lequeux",
            }, {
                "answered_at": "2017-12-12T19:34:02.781Z",
                "player_answer": "Estelle Boyer",
                "valid_answer": "Estelle Boyer",
            }, {
                "answered_at": "2017-12-12T19:34:04.808Z",
                "player_answer": "Clément Héliou",
                "valid_answer": "Clément Héliou",
            }, {
                "answered_at": "2017-12-12T19:34:06.580Z",
                "player_answer": "Jean-Baptiste Claramonte",
                "valid_answer": "Jean-Baptiste Claramonte",
            }, {
                "answered_at": "2017-12-12T19:34:08.170Z",
                "player_answer": "Christophe Heubès",
                "valid_answer": "Christophe Heubès",
            }, {
                "answered_at": "2017-12-12T19:34:10.212Z",
                "player_answer": "Yoann Benoit",
                "valid_answer": "Yoann Benoit",
            }, {
                "answered_at": "2017-12-12T19:34:12.233Z",
                "player_answer": "M&#39;hend Ahmedi",
                "valid_answer": "M&#39;hend Ahmedi",
            }, {
                "answered_at": "2017-12-12T19:34:14.076Z",
                "player_answer": "Jonathan Norblin",
                "valid_answer": "Jonathan Norblin",
            }, {
                "answered_at": "2017-12-12T19:34:16.073Z",
                "player_answer": "Sameh Ben Fredj",
                "valid_answer": "Sameh Ben Fredj",
            }, {
                "answered_at": "2017-12-12T19:34:18.640Z",
                "player_answer": "Gwenael Bonhommeau",
                "valid_answer": "Gwenael Bonhommeau",
            }, {
                "answered_at": "2017-12-12T19:34:20.916Z",
                "player_answer": "Cyril Verdier",
                "valid_answer": "Cyril Verdier",
            }, {
                "answered_at": "2017-12-12T19:34:22.677Z",
                "player_answer": "François Laurain",
                "valid_answer": "François Laurain",
            }, {
                "answered_at": "2017-12-12T19:34:24.629Z",
                "player_answer": "Wenly Candy",
                "valid_answer": "Wenly Candy",
            }, {
                "answered_at": "2017-12-12T19:34:26.812Z",
                "player_answer": "François Ledamoisel",
                "valid_answer": "François Ledamoisel",
            }, {
                "answered_at": "2017-12-12T19:34:29.355Z",
                "player_answer": "Alexis Chotard",
                "valid_answer": "Alexis Chotard",
            }, {
                "answered_at": "2017-12-12T19:34:31.467Z",
                "player_answer": "Yannick Lorenzati",
                "valid_answer": "Yannick Lorenzati",
            }, {
                "answered_at": "2017-12-12T19:34:33.366Z",
                "player_answer": "Pierre Sendorek",
                "valid_answer": "Pierre Sendorek",
            }, {
                "answered_at": "2017-12-12T19:34:35.188Z",
                "player_answer": "Antoine Michaud",
                "valid_answer": "Antoine Michaud",
            }, {
                "answered_at": "2017-12-12T19:34:37.056Z",
                "player_answer": "Kristof Kerninon",
                "valid_answer": "Kristof Kerninon",
            }, {
                "answered_at": "2017-12-12T19:34:38.838Z",
                "player_answer": "Régis Allais",
                "valid_answer": "Régis Allais",
            }, {
                "answered_at": "2017-12-12T19:34:40.423Z",
                "player_answer": "Laetitia Jannée",
                "valid_answer": "Laetitia Jannée",
            }, {
                "answered_at": "2017-12-12T19:34:43.718Z",
                "player_answer": "Nicolas Jozwiak",
                "valid_answer": "Nicolas Jozwiak",
            }, {
                "answered_at": "2017-12-12T19:34:47.429Z",
                "player_answer": "Laurène Thenoz",
                "valid_answer": "Laurène Thenoz",
            }, {
                "answered_at": "2017-12-12T19:34:49.784Z",
                "player_answer": "Adrien Kvaternik",
                "valid_answer": "Adrien Kvaternik",
            }, {
                "answered_at": "2017-12-12T19:34:52.152Z",
                "player_answer": "Kathleen Cardoso",
                "valid_answer": "Kathleen Cardoso",
            }, {
                "answered_at": "2017-12-12T19:34:53.939Z",
                "player_answer": "Harry Jumeau",
                "valid_answer": "Harry Jumeau",
            }, {
                "answered_at": "2017-12-12T19:34:59.269Z",
                "player_answer": "Mouloud Lounaci",
                "valid_answer": "Mouloud Lounaci",
            }, {
                "answered_at": "2017-12-12T19:35:03.291Z",
                "player_answer": "Jérôme Pain",
                "valid_answer": "Jérôme Pain",
            }, {
                "answered_at": "2017-12-12T19:35:06.162Z",
                "player_answer": "Sébastien Manicon",
                "valid_answer": "Sébastien Manicon",
            }, {
                "answered_at": "2017-12-12T19:35:08.353Z",
                "player_answer": "Charles Dufour",
                "valid_answer": "Charles Dufour",
            }, {
                "answered_at": "2017-12-12T19:35:12.557Z",
                "player_answer": "Thibaud Cavin",
                "valid_answer": "Thibaud Cavin",
            }, {
                "answered_at": "2017-12-12T19:35:14.576Z",
                "player_answer": "Antoine Marcou",
                "valid_answer": "Antoine Marcou",
            }, {
                "answered_at": "2017-12-12T19:35:16.653Z",
                "player_answer": "Thomas Champion",
                "valid_answer": "Thomas Champion",
            }, {
                "answered_at": "2017-12-12T19:35:19.434Z",
                "player_answer": "Isabelle Roques",
                "valid_answer": "Isabelle Roques",
            }, {
                "answered_at": "2017-12-12T19:35:21.864Z",
                "player_answer": "Jean-Pascal Thiery",
                "valid_answer": "Jean-Pascal Thiery",
            }, {
                "answered_at": "2017-12-12T19:35:24.532Z",
                "player_answer": "Thomas Depinoy",
                "valid_answer": "Thomas Depinoy",
            }, {
                "answered_at": "2017-12-12T19:35:27.423Z",
                "player_answer": "Michael Ohayon",
                "valid_answer": "Michael Ohayon",
            }, {
                "answered_at": "2017-12-12T19:35:29.790Z",
                "player_answer": "Cathie Nguyen",
                "valid_answer": "Cathie Nguyen",
            }, {
                "answered_at": "2017-12-12T19:35:32.613Z",
                "player_answer": "Arnaud Bracchetti",
                "valid_answer": "Arnaud Bracchetti",
            }, {
                "answered_at": "2017-12-12T19:35:35.028Z",
                "player_answer": "Ivan Beauvais",
                "valid_answer": "Ivan Beauvais",
            }, {
                "answered_at": "2017-12-12T19:35:38.100Z",
                "player_answer": "Arthur Sudre",
                "valid_answer": "Arthur Sudre",
            }, {
                "answered_at": "2017-12-12T19:35:41.618Z",
                "player_answer": "Diana Ortega",
                "valid_answer": "Diana Ortega",
            }, {
                "answered_at": "2017-12-12T19:35:43.634Z",
                "player_answer": "Johan Girondeau",
                "valid_answer": "Johan Girondeau",
            }, {
                "answered_at": "2017-12-12T19:35:46.724Z",
                "player_answer": "Walid Haouri",
                "valid_answer": "Walid Haouri",
            }, {
                "answered_at": "2017-12-12T19:35:49.702Z",
                "player_answer": "Benoit Moussaud",
                "valid_answer": "Benoit Moussaud",
            }, {
                "answered_at": "2017-12-12T19:35:53.069Z",
                "player_answer": "Peter Onneby",
                "valid_answer": "Peter Onneby",
            }, {
                "answered_at": "2017-12-12T19:35:55.108Z",
                "player_answer": "Mikhail Sadovnikov",
                "valid_answer": "Mikhail Sadovnikov",
            }, {
                "answered_at": "2017-12-12T19:35:57.673Z",
                "player_answer": "Maël Razavet",
                "valid_answer": "Maël Razavet",
            }, {
                "answered_at": "2017-12-12T19:35:59.675Z",
                "player_answer": "Edern Hotte",
                "valid_answer": "Edern Hotte",
            }, {
                "answered_at": "2017-12-12T19:36:01.754Z",
                "player_answer": "Floriane Le Ruyet",
                "valid_answer": "Floriane Le Ruyet",
            }, {
                "answered_at": "2017-12-12T19:36:03.991Z",
                "player_answer": "Laurent Russier",
                "valid_answer": "Laurent Russier",
            }, {
                "answered_at": "2017-12-12T19:36:06.815Z",
                "player_answer": "Stéphane Francel",
                "valid_answer": "Stéphane Francel",
            }, {
                "answered_at": "2017-12-12T19:36:08.979Z",
                "player_answer": "Nora Bounabat",
                "valid_answer": "Nora Bounabat",
            }, {
                "answered_at": "2017-12-12T19:36:10.410Z",
                "player_answer": "Sara Rodrigues",
                "valid_answer": "Sara Rodrigues",
            }, {
                "answered_at": "2017-12-12T19:36:12.153Z",
                "player_answer": "Emmanuel Sciara",
                "valid_answer": "Emmanuel Sciara",
            }, {
                "answered_at": "2017-12-12T19:36:13.877Z",
                "player_answer": "Ludovic Perot",
                "valid_answer": "Ludovic Perot",
            }, {
                "answered_at": "2017-12-12T19:36:16.733Z",
                "player_answer": "Joseph Sayavongsa",
                "valid_answer": "Joseph Sayavongsa",
            }, {
                "answered_at": "2017-12-12T19:36:18.435Z",
                "player_answer": "Julien Estival",
                "valid_answer": "Julien Estival",
            }, {
                "answered_at": "2017-12-12T19:36:20.529Z",
                "player_answer": "Olivier Pietremont",
                "valid_answer": "Olivier Pietremont",
            }, {
                "answered_at": "2017-12-12T19:36:22.852Z",
                "player_answer": "Alexandre Dergham",
                "valid_answer": "Alexandre Dergham",
            }, {
                "answered_at": "2017-12-12T19:36:24.883Z",
                "player_answer": "Qian Jin",
                "valid_answer": "Qian Jin",
            }, {
                "answered_at": "2017-12-12T19:36:26.940Z",
                "player_answer": "Roderic Pratt",
                "valid_answer": "Roderic Pratt",
            }, {
                "answered_at": "2017-12-12T19:36:31.474Z",
                "player_answer": "Loic Divad",
                "valid_answer": "Loic Divad",
            }, {
                "answered_at": "2017-12-12T19:36:34.223Z",
                "player_answer": "Florian Desrousseaux",
                "valid_answer": "Florent Capon",
            }, {
                "answered_at": "2017-12-12T19:36:37.387Z",
                "player_answer": "Ramy Temim",
                "valid_answer": "Ramy Temim",
            }, {
                "answered_at": "2017-12-12T19:36:39.155Z",
                "player_answer": "Jean-Louis Rigau",
                "valid_answer": "Jean-Louis Rigau",
            }, {
                "answered_at": "2017-12-12T19:36:40.715Z",
                "player_answer": "Arnaud Piroelle",
                "valid_answer": "Arnaud Piroelle",
            }, {
                "answered_at": "2017-12-12T19:36:42.267Z",
                "player_answer": "Diana Ortega",
                "valid_answer": "Aurore De Amaral",
            }, {
                "answered_at": "2017-12-12T19:36:46.879Z",
                "player_answer": "Benjamin Dupin",
                "valid_answer": "Benjamin Dupin",
            }, {
                "answered_at": "2017-12-12T19:36:50.315Z",
                "player_answer": "Romain Ardiet",
                "valid_answer": "Romain Ardiet",
            }, {
                "answered_at": "2017-12-12T19:36:52.191Z",
                "player_answer": "Mohamed Hamady",
                "valid_answer": "Mohamed Hamady",
            }, {
                "answered_at": "2017-12-12T19:36:54.396Z",
                "player_answer": "Josselin Moulay",
                "valid_answer": "Josselin Moulay",
            }, {
                "answered_at": "2017-12-12T19:36:55.939Z",
                "player_answer": "Giulia Bianchi",
                "valid_answer": "Giulia Bianchi",
            }, {
                "answered_at": "2017-12-12T19:36:57.647Z",
                "player_answer": "Anne-Sophie Girault",
                "valid_answer": "Anne-Sophie Girault",
            }, {
                "answered_at": "2017-12-12T19:36:59.946Z",
                "player_answer": "Ludovic Ladeu",
                "valid_answer": "Ludovic Ladeu",
            }, {
                "answered_at": "2017-12-12T19:37:01.479Z",
                "player_answer": "Alban Dauleu",
                "valid_answer": "Alban Dauleu",
            }, {
                "answered_at": "2017-12-12T19:37:04.663Z",
                "player_answer": "Alexandre Cohen",
                "valid_answer": "Alexandre Cohen",
            }, {
                "answered_at": "2017-12-12T19:37:07.312Z",
                "player_answer": "Bastien Charès",
                "valid_answer": "Bastien Charès",
            }, {
                "answered_at": "2017-12-12T19:37:09.038Z",
                "player_answer": "Florian Desrousseaux",
                "valid_answer": "Florian Desrousseaux",
            }, {
                "answered_at": "2017-12-12T19:37:13.075Z",
                "player_answer": "Nicolas Laille",
                "valid_answer": "Nicolas Laille",
            }, {
                "answered_at": "2017-12-12T19:37:15.542Z",
                "player_answer": "Thomas Auffredou",
                "valid_answer": "Thomas Auffredou",
            }, {
                "answered_at": "2017-12-12T19:37:17.062Z",
                "player_answer": "Adrien Guiot",
                "valid_answer": "Adrien Guiot",
            }, {
                "answered_at": "2017-12-12T19:37:19.507Z",
                "player_answer": "Michael Werner",
                "valid_answer": "Michael Werner",
            }, {
                "answered_at": "2017-12-12T19:37:20.963Z",
                "player_answer": "Alban Phelip",
                "valid_answer": "Alban Phelip",
            }, {
                "answered_at": "2017-12-12T19:37:22.907Z",
                "player_answer": "Alexis Kinsella",
                "valid_answer": "Alexis Kinsella",
            }, {
                "answered_at": "2017-12-12T19:37:25.232Z",
                "player_answer": "José Martin",
                "valid_answer": "José Martin",
            }, {
                "answered_at": "2017-12-12T19:37:27.162Z",
                "player_answer": "Paul-Guillaume Dejardin",
                "valid_answer": "Paul-Guillaume Dejardin",
            }, {
                "answered_at": "2017-12-12T19:37:28.900Z",
                "player_answer": "Frédéric Courdier",
                "valid_answer": "Frédéric Courdier",
            }, {
                "answered_at": "2017-12-12T19:37:31.082Z",
                "player_answer": "Antoine Le Taxin",
                "valid_answer": "Antoine Le Taxin",
            }, {
                "answered_at": "2017-12-12T19:37:33.086Z",
                "player_answer": "Julien Datour",
                "valid_answer": "Julien Datour",
            }, {
                "answered_at": "2017-12-12T19:37:34.600Z",
                "player_answer": "Joachim Rousseau",
                "valid_answer": "Joachim Rousseau",
            }, {
                "answered_at": "2017-12-12T19:37:36.175Z",
                "player_answer": "Nadia Sidhoum",
                "valid_answer": "Nadia Sidhoum",
            }, {
                "answered_at": "2017-12-12T19:37:40.438Z",
                "player_answer": "Thomas Ricart",
                "valid_answer": "Thomas Ricart",
            }, {
                "answered_at": "2017-12-12T19:37:42.340Z",
                "player_answer": "Noémie Verscheure",
                "valid_answer": "Noémie Verscheure",
            }, {
                "answered_at": "2017-12-12T19:37:44.156Z",
                "player_answer": "Luc Legardeur",
                "valid_answer": "Luc Legardeur",
            }, {
                "answered_at": "2017-12-12T19:37:46.748Z",
                "player_answer": "Romain Sagean",
                "valid_answer": "Romain Sagean",
            }, {
                "answered_at": "2017-12-12T19:37:48.607Z",
                "player_answer": "Jean-Christophe Pastant",
                "valid_answer": "Jean-Christophe Pastant",
            }, {
                "answered_at": "2017-12-12T19:37:50.202Z",
                "player_answer": "Anne Beauchart",
                "valid_answer": "Anne Beauchart",
            }, {
                "answered_at": "2017-12-12T19:37:52.323Z",
                "player_answer": "Christophe Pelé",
                "valid_answer": "Christophe Pelé",
            }, {
                "answered_at": "2017-12-12T19:37:54.247Z",
                "player_answer": "Pauline Tirman",
                "valid_answer": "Pauline Tirman",
            }, {
                "answered_at": "2017-12-12T19:37:55.936Z",
                "player_answer": "Romain Lavancier",
                "valid_answer": "Romain Lavancier",
            }, {
                "answered_at": "2017-12-12T19:37:57.815Z",
                "player_answer": "Olivier Ghizzo",
                "valid_answer": "Olivier Ghizzo",
            }, {
                "answered_at": "2017-12-12T19:38:00.933Z",
                "player_answer": "Arduino Cascella",
                "valid_answer": "Arduino Cascella",
            }, {
                "answered_at": "2017-12-12T19:38:03.047Z",
                "player_answer": "Maxime Dupoisson",
                "valid_answer": "Maxime Dupoisson",
            }, {
                "answered_at": "2017-12-12T19:38:04.837Z",
                "player_answer": "Loic Bigot",
                "valid_answer": "Loic Bigot",
            }, {
                "answered_at": "2017-12-12T19:38:08.159Z",
                "player_answer": "Patryk Gruszka",
                "valid_answer": "Patryk Gruszka",
            }, {
                "answered_at": "2017-12-12T19:38:10.620Z",
                "player_answer": "Nelson Dufossé",
                "valid_answer": "Nelson Dufossé",
            }, {
                "answered_at": "2017-12-12T19:38:12.779Z",
                "player_answer": "Mohamed Chaaben",
                "valid_answer": "Mohamed Chaaben",
            }, {
                "answered_at": "2017-12-12T19:38:15.101Z",
                "player_answer": "Jean-Baptiste Petit",
                "valid_answer": "Jean-Baptiste Petit",
            }, {
                "answered_at": "2017-12-12T19:38:16.655Z",
                "player_answer": "Julien Smadja",
                "valid_answer": "Julien Smadja",
            }, {
                "answered_at": "2017-12-12T19:38:18.402Z",
                "player_answer": "Julien Rossignol",
                "valid_answer": "Julien Rossignol",
            }],
            "bonuses": [],
            "elapsed_time": 379.068,
            "accuracy": 98.06451612903226
        });
    t.deepEqual(game.detail,
        {
            "player": "Anonymous",
            "started_at": "2017-12-12T19:31:59.334Z",
            "questions": 155,
            "score": 46800,
            "frames": [{
                "answered_at": "2017-12-12T19:32:22.312Z",
                "player_answer": "Lionel Guez",
                "score": 100,
                "valid_answer": "Lionel Guez",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:32:24.396Z",
                "player_answer": "Sergio Dos Santos",
                "score": 100,
                "valid_answer": "Sergio Dos Santos",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:32:26.244Z",
                "player_answer": "Richard Mathis",
                "score": 400,
                "valid_answer": "Richard Mathis",
                "critical": true
            }, {
                "answered_at": "2017-12-12T19:32:28.144Z",
                "player_answer": "Zahir Hamroune",
                "score": 100,
                "valid_answer": "Zahir Hamroune",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:32:30.682Z",
                "player_answer": "Souhaib Guitouni",
                "score": 100,
                "valid_answer": "Souhaib Guitouni",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:32:32.841Z",
                "player_answer": "Julien Bonachera",
                "score": 100,
                "valid_answer": "Julien Bonachera",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:32:34.642Z",
                "player_answer": "Bastien Bonnet",
                "score": 100,
                "valid_answer": "Bastien Bonnet",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:32:36.347Z",
                "player_answer": "Alexis Tessier",
                "score": 900,
                "valid_answer": "Alexis Tessier",
                "critical": true
            }, {
                "answered_at": "2017-12-12T19:32:38.126Z",
                "player_answer": "Isabelle Roques",
                "score": 0,
                "valid_answer": "Marina Tracco",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:32:41.339Z",
                "player_answer": "Vincent Segouin",
                "score": 100,
                "valid_answer": "Vincent Segouin",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:32:43.977Z",
                "player_answer": "Yassir Sennoun",
                "score": 100,
                "valid_answer": "Yassir Sennoun",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:32:46.153Z",
                "player_answer": "Thomas Simonnet",
                "score": 400,
                "valid_answer": "Thomas Simonnet",
                "critical": true
            }, {
                "answered_at": "2017-12-12T19:32:48.231Z",
                "player_answer": "Gérôme Egron",
                "score": 100,
                "valid_answer": "Gérôme Egron",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:32:50.201Z",
                "player_answer": "Fares Oueslati",
                "score": 100,
                "valid_answer": "Fares Oueslati",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:32:52.070Z",
                "player_answer": "Stéphane Guedon",
                "score": 100,
                "valid_answer": "Stéphane Guedon",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:32:53.591Z",
                "player_answer": "Anta Aidara",
                "score": 100,
                "valid_answer": "Anta Aidara",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:32:57.868Z",
                "player_answer": "David Attali",
                "score": 900,
                "valid_answer": "David Attali",
                "critical": true
            }, {
                "answered_at": "2017-12-12T19:32:59.624Z",
                "player_answer": "Morgane Eckert",
                "score": 100,
                "valid_answer": "Morgane Eckert",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:01.882Z",
                "player_answer": "Clément Rochas",
                "score": 100,
                "valid_answer": "Clément Rochas",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:04.006Z",
                "player_answer": "Bruno Bouchahoua",
                "score": 100,
                "valid_answer": "Bruno Bouchahoua",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:06.530Z",
                "player_answer": "Fabien Mirault",
                "score": 100,
                "valid_answer": "Fabien Mirault",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:09.020Z",
                "player_answer": "Renaud Chevalier",
                "score": 1400,
                "valid_answer": "Renaud Chevalier",
                "critical": true
            }, {
                "answered_at": "2017-12-12T19:33:10.647Z",
                "player_answer": "Tracy Anicet",
                "score": 100,
                "valid_answer": "Tracy Anicet",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:13.004Z",
                "player_answer": "Moises Trelles",
                "score": 100,
                "valid_answer": "Moises Trelles",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:14.987Z",
                "player_answer": "Sandra Pietrowska",
                "score": 100,
                "valid_answer": "Sandra Pietrowska",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:17.752Z",
                "player_answer": "Géraud Beguin",
                "score": 100,
                "valid_answer": "Géraud Beguin",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:19.336Z",
                "player_answer": "Jonathan Raffre",
                "score": 100,
                "valid_answer": "Jonathan Raffre",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:22.212Z",
                "player_answer": "Dara Lim",
                "score": 100,
                "valid_answer": "Dara Lim",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:24.146Z",
                "player_answer": "Benjamin Lacroix",
                "score": 100,
                "valid_answer": "Benjamin Lacroix",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:27.043Z",
                "player_answer": "Javier Merchan",
                "score": 2200,
                "valid_answer": "Javier Merchan",
                "critical": true
            }, {
                "answered_at": "2017-12-12T19:33:29.189Z",
                "player_answer": "Dmytro Podyachiy",
                "score": 100,
                "valid_answer": "Dmytro Podyachiy",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:30.665Z",
                "player_answer": "Pierre-Philippe Beauchemin",
                "score": 100,
                "valid_answer": "Pierre-Philippe Beauchemin",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:32.806Z",
                "player_answer": "Olivier Marquet",
                "score": 100,
                "valid_answer": "Olivier Marquet",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:35.286Z",
                "player_answer": "Sylvain Decout",
                "score": 100,
                "valid_answer": "Sylvain Decout",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:36.889Z",
                "player_answer": "Ingrid Aniotz",
                "score": 100,
                "valid_answer": "Ingrid Aniotz",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:42.528Z",
                "player_answer": "Edouard Siha",
                "score": 100,
                "valid_answer": "Edouard Siha",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:44.583Z",
                "player_answer": "Julien Simon",
                "score": 100,
                "valid_answer": "Julien Simon",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:46.382Z",
                "player_answer": "Simone Civetta",
                "score": 100,
                "valid_answer": "Simone Civetta",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:49.171Z",
                "player_answer": "Laurent Seng",
                "score": 100,
                "valid_answer": "Laurent Seng",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:51.873Z",
                "player_answer": "Damien Baron",
                "score": 100,
                "valid_answer": "Damien Baron",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:53.417Z",
                "player_answer": "Jeremy Pinsolle",
                "score": 100,
                "valid_answer": "Jeremy Pinsolle",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:55.481Z",
                "player_answer": "Nicolas Dechandon",
                "score": 100,
                "valid_answer": "Nicolas Dechandon",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:33:57.123Z",
                "player_answer": "Anthony Giniers",
                "score": 3500,
                "valid_answer": "Anthony Giniers",
                "critical": true
            }, {
                "answered_at": "2017-12-12T19:33:58.992Z",
                "player_answer": "Sarah Buisson",
                "score": 100,
                "valid_answer": "Sarah Buisson",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:00.870Z",
                "player_answer": "Sylvain Lequeux",
                "score": 100,
                "valid_answer": "Sylvain Lequeux",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:02.781Z",
                "player_answer": "Estelle Boyer",
                "score": 100,
                "valid_answer": "Estelle Boyer",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:04.808Z",
                "player_answer": "Clément Héliou",
                "score": 100,
                "valid_answer": "Clément Héliou",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:06.580Z",
                "player_answer": "Jean-Baptiste Claramonte",
                "score": 100,
                "valid_answer": "Jean-Baptiste Claramonte",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:08.170Z",
                "player_answer": "Christophe Heubès",
                "score": 100,
                "valid_answer": "Christophe Heubès",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:10.212Z",
                "player_answer": "Yoann Benoit",
                "score": 100,
                "valid_answer": "Yoann Benoit",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:12.233Z",
                "player_answer": "M&#39;hend Ahmedi",
                "score": 100,
                "valid_answer": "M&#39;hend Ahmedi",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:14.076Z",
                "player_answer": "Jonathan Norblin",
                "score": 100,
                "valid_answer": "Jonathan Norblin",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:16.073Z",
                "player_answer": "Sameh Ben Fredj",
                "score": 100,
                "valid_answer": "Sameh Ben Fredj",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:18.640Z",
                "player_answer": "Gwenael Bonhommeau",
                "score": 100,
                "valid_answer": "Gwenael Bonhommeau",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:20.916Z",
                "player_answer": "Cyril Verdier",
                "score": 100,
                "valid_answer": "Cyril Verdier",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:22.677Z",
                "player_answer": "François Laurain",
                "score": 100,
                "valid_answer": "François Laurain",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:24.629Z",
                "player_answer": "Wenly Candy",
                "score": 100,
                "valid_answer": "Wenly Candy",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:26.812Z",
                "player_answer": "François Ledamoisel",
                "score": 100,
                "valid_answer": "François Ledamoisel",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:29.355Z",
                "player_answer": "Alexis Chotard",
                "score": 100,
                "valid_answer": "Alexis Chotard",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:31.467Z",
                "player_answer": "Yannick Lorenzati",
                "score": 100,
                "valid_answer": "Yannick Lorenzati",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:33.366Z",
                "player_answer": "Pierre Sendorek",
                "score": 100,
                "valid_answer": "Pierre Sendorek",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:35.188Z",
                "player_answer": "Antoine Michaud",
                "score": 100,
                "valid_answer": "Antoine Michaud",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:37.056Z",
                "player_answer": "Kristof Kerninon",
                "score": 100,
                "valid_answer": "Kristof Kerninon",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:38.838Z",
                "player_answer": "Régis Allais",
                "score": 5600,
                "valid_answer": "Régis Allais",
                "critical": true
            }, {
                "answered_at": "2017-12-12T19:34:40.423Z",
                "player_answer": "Laetitia Jannée",
                "score": 100,
                "valid_answer": "Laetitia Jannée",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:43.718Z",
                "player_answer": "Nicolas Jozwiak",
                "score": 100,
                "valid_answer": "Nicolas Jozwiak",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:47.429Z",
                "player_answer": "Laurène Thenoz",
                "score": 100,
                "valid_answer": "Laurène Thenoz",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:49.784Z",
                "player_answer": "Adrien Kvaternik",
                "score": 100,
                "valid_answer": "Adrien Kvaternik",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:52.152Z",
                "player_answer": "Kathleen Cardoso",
                "score": 100,
                "valid_answer": "Kathleen Cardoso",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:53.939Z",
                "player_answer": "Harry Jumeau",
                "score": 100,
                "valid_answer": "Harry Jumeau",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:34:59.269Z",
                "player_answer": "Mouloud Lounaci",
                "score": 100,
                "valid_answer": "Mouloud Lounaci",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:03.291Z",
                "player_answer": "Jérôme Pain",
                "score": 100,
                "valid_answer": "Jérôme Pain",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:06.162Z",
                "player_answer": "Sébastien Manicon",
                "score": 100,
                "valid_answer": "Sébastien Manicon",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:08.353Z",
                "player_answer": "Charles Dufour",
                "score": 100,
                "valid_answer": "Charles Dufour",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:12.557Z",
                "player_answer": "Thibaud Cavin",
                "score": 100,
                "valid_answer": "Thibaud Cavin",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:14.576Z",
                "player_answer": "Antoine Marcou",
                "score": 100,
                "valid_answer": "Antoine Marcou",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:16.653Z",
                "player_answer": "Thomas Champion",
                "score": 100,
                "valid_answer": "Thomas Champion",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:19.434Z",
                "player_answer": "Isabelle Roques",
                "score": 100,
                "valid_answer": "Isabelle Roques",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:21.864Z",
                "player_answer": "Jean-Pascal Thiery",
                "score": 100,
                "valid_answer": "Jean-Pascal Thiery",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:24.532Z",
                "player_answer": "Thomas Depinoy",
                "score": 100,
                "valid_answer": "Thomas Depinoy",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:27.423Z",
                "player_answer": "Michael Ohayon",
                "score": 100,
                "valid_answer": "Michael Ohayon",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:29.790Z",
                "player_answer": "Cathie Nguyen",
                "score": 100,
                "valid_answer": "Cathie Nguyen",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:32.613Z",
                "player_answer": "Arnaud Bracchetti",
                "score": 100,
                "valid_answer": "Arnaud Bracchetti",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:35.028Z",
                "player_answer": "Ivan Beauvais",
                "score": 100,
                "valid_answer": "Ivan Beauvais",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:38.100Z",
                "player_answer": "Arthur Sudre",
                "score": 100,
                "valid_answer": "Arthur Sudre",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:41.618Z",
                "player_answer": "Diana Ortega",
                "score": 100,
                "valid_answer": "Diana Ortega",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:43.634Z",
                "player_answer": "Johan Girondeau",
                "score": 100,
                "valid_answer": "Johan Girondeau",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:46.724Z",
                "player_answer": "Walid Haouri",
                "score": 100,
                "valid_answer": "Walid Haouri",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:49.702Z",
                "player_answer": "Benoit Moussaud",
                "score": 100,
                "valid_answer": "Benoit Moussaud",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:53.069Z",
                "player_answer": "Peter Onneby",
                "score": 100,
                "valid_answer": "Peter Onneby",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:55.108Z",
                "player_answer": "Mikhail Sadovnikov",
                "score": 100,
                "valid_answer": "Mikhail Sadovnikov",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:57.673Z",
                "player_answer": "Maël Razavet",
                "score": 100,
                "valid_answer": "Maël Razavet",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:35:59.675Z",
                "player_answer": "Edern Hotte",
                "score": 100,
                "valid_answer": "Edern Hotte",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:01.754Z",
                "player_answer": "Floriane Le Ruyet",
                "score": 100,
                "valid_answer": "Floriane Le Ruyet",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:03.991Z",
                "player_answer": "Laurent Russier",
                "score": 100,
                "valid_answer": "Laurent Russier",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:06.815Z",
                "player_answer": "Stéphane Francel",
                "score": 100,
                "valid_answer": "Stéphane Francel",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:08.979Z",
                "player_answer": "Nora Bounabat",
                "score": 100,
                "valid_answer": "Nora Bounabat",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:10.410Z",
                "player_answer": "Sara Rodrigues",
                "score": 9000,
                "valid_answer": "Sara Rodrigues",
                "critical": true
            }, {
                "answered_at": "2017-12-12T19:36:12.153Z",
                "player_answer": "Emmanuel Sciara",
                "score": 100,
                "valid_answer": "Emmanuel Sciara",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:13.877Z",
                "player_answer": "Ludovic Perot",
                "score": 100,
                "valid_answer": "Ludovic Perot",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:16.733Z",
                "player_answer": "Joseph Sayavongsa",
                "score": 100,
                "valid_answer": "Joseph Sayavongsa",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:18.435Z",
                "player_answer": "Julien Estival",
                "score": 100,
                "valid_answer": "Julien Estival",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:20.529Z",
                "player_answer": "Olivier Pietremont",
                "score": 100,
                "valid_answer": "Olivier Pietremont",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:22.852Z",
                "player_answer": "Alexandre Dergham",
                "score": 100,
                "valid_answer": "Alexandre Dergham",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:24.883Z",
                "player_answer": "Qian Jin",
                "score": 100,
                "valid_answer": "Qian Jin",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:26.940Z",
                "player_answer": "Roderic Pratt",
                "score": 100,
                "valid_answer": "Roderic Pratt",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:31.474Z",
                "player_answer": "Loic Divad",
                "score": 100,
                "valid_answer": "Loic Divad",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:34.223Z",
                "player_answer": "Florian Desrousseaux",
                "score": 0,
                "valid_answer": "Florent Capon",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:37.387Z",
                "player_answer": "Ramy Temim",
                "score": 100,
                "valid_answer": "Ramy Temim",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:39.155Z",
                "player_answer": "Jean-Louis Rigau",
                "score": 100,
                "valid_answer": "Jean-Louis Rigau",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:40.715Z",
                "player_answer": "Arnaud Piroelle",
                "score": 400,
                "valid_answer": "Arnaud Piroelle",
                "critical": true
            }, {
                "answered_at": "2017-12-12T19:36:42.267Z",
                "player_answer": "Diana Ortega",
                "score": 0,
                "valid_answer": "Aurore De Amaral",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:46.879Z",
                "player_answer": "Benjamin Dupin",
                "score": 100,
                "valid_answer": "Benjamin Dupin",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:50.315Z",
                "player_answer": "Romain Ardiet",
                "score": 100,
                "valid_answer": "Romain Ardiet",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:52.191Z",
                "player_answer": "Mohamed Hamady",
                "score": 400,
                "valid_answer": "Mohamed Hamady",
                "critical": true
            }, {
                "answered_at": "2017-12-12T19:36:54.396Z",
                "player_answer": "Josselin Moulay",
                "score": 100,
                "valid_answer": "Josselin Moulay",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:55.939Z",
                "player_answer": "Giulia Bianchi",
                "score": 100,
                "valid_answer": "Giulia Bianchi",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:57.647Z",
                "player_answer": "Anne-Sophie Girault",
                "score": 100,
                "valid_answer": "Anne-Sophie Girault",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:36:59.946Z",
                "player_answer": "Ludovic Ladeu",
                "score": 100,
                "valid_answer": "Ludovic Ladeu",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:01.479Z",
                "player_answer": "Alban Dauleu",
                "score": 900,
                "valid_answer": "Alban Dauleu",
                "critical": true
            }, {
                "answered_at": "2017-12-12T19:37:04.663Z",
                "player_answer": "Alexandre Cohen",
                "score": 100,
                "valid_answer": "Alexandre Cohen",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:07.312Z",
                "player_answer": "Bastien Charès",
                "score": 100,
                "valid_answer": "Bastien Charès",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:09.038Z",
                "player_answer": "Florian Desrousseaux",
                "score": 100,
                "valid_answer": "Florian Desrousseaux",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:13.075Z",
                "player_answer": "Nicolas Laille",
                "score": 100,
                "valid_answer": "Nicolas Laille",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:15.542Z",
                "player_answer": "Thomas Auffredou",
                "score": 1400,
                "valid_answer": "Thomas Auffredou",
                "critical": true
            }, {
                "answered_at": "2017-12-12T19:37:17.062Z",
                "player_answer": "Adrien Guiot",
                "score": 100,
                "valid_answer": "Adrien Guiot",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:19.507Z",
                "player_answer": "Michael Werner",
                "score": 100,
                "valid_answer": "Michael Werner",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:20.963Z",
                "player_answer": "Alban Phelip",
                "score": 100,
                "valid_answer": "Alban Phelip",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:22.907Z",
                "player_answer": "Alexis Kinsella",
                "score": 100,
                "valid_answer": "Alexis Kinsella",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:25.232Z",
                "player_answer": "José Martin",
                "score": 100,
                "valid_answer": "José Martin",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:27.162Z",
                "player_answer": "Paul-Guillaume Dejardin",
                "score": 100,
                "valid_answer": "Paul-Guillaume Dejardin",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:28.900Z",
                "player_answer": "Frédéric Courdier",
                "score": 100,
                "valid_answer": "Frédéric Courdier",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:31.082Z",
                "player_answer": "Antoine Le Taxin",
                "score": 2200,
                "valid_answer": "Antoine Le Taxin",
                "critical": true
            }, {
                "answered_at": "2017-12-12T19:37:33.086Z",
                "player_answer": "Julien Datour",
                "score": 100,
                "valid_answer": "Julien Datour",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:34.600Z",
                "player_answer": "Joachim Rousseau",
                "score": 100,
                "valid_answer": "Joachim Rousseau",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:36.175Z",
                "player_answer": "Nadia Sidhoum",
                "score": 100,
                "valid_answer": "Nadia Sidhoum",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:40.438Z",
                "player_answer": "Thomas Ricart",
                "score": 100,
                "valid_answer": "Thomas Ricart",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:42.340Z",
                "player_answer": "Noémie Verscheure",
                "score": 100,
                "valid_answer": "Noémie Verscheure",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:44.156Z",
                "player_answer": "Luc Legardeur",
                "score": 100,
                "valid_answer": "Luc Legardeur",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:46.748Z",
                "player_answer": "Romain Sagean",
                "score": 100,
                "valid_answer": "Romain Sagean",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:48.607Z",
                "player_answer": "Jean-Christophe Pastant",
                "score": 100,
                "valid_answer": "Jean-Christophe Pastant",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:50.202Z",
                "player_answer": "Anne Beauchart",
                "score": 100,
                "valid_answer": "Anne Beauchart",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:52.323Z",
                "player_answer": "Christophe Pelé",
                "score": 100,
                "valid_answer": "Christophe Pelé",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:54.247Z",
                "player_answer": "Pauline Tirman",
                "score": 100,
                "valid_answer": "Pauline Tirman",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:55.936Z",
                "player_answer": "Romain Lavancier",
                "score": 100,
                "valid_answer": "Romain Lavancier",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:37:57.815Z",
                "player_answer": "Olivier Ghizzo",
                "score": 3500,
                "valid_answer": "Olivier Ghizzo",
                "critical": true
            }, {
                "answered_at": "2017-12-12T19:38:00.933Z",
                "player_answer": "Arduino Cascella",
                "score": 100,
                "valid_answer": "Arduino Cascella",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:38:03.047Z",
                "player_answer": "Maxime Dupoisson",
                "score": 100,
                "valid_answer": "Maxime Dupoisson",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:38:04.837Z",
                "player_answer": "Loic Bigot",
                "score": 100,
                "valid_answer": "Loic Bigot",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:38:08.159Z",
                "player_answer": "Patryk Gruszka",
                "score": 100,
                "valid_answer": "Patryk Gruszka",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:38:10.620Z",
                "player_answer": "Nelson Dufossé",
                "score": 100,
                "valid_answer": "Nelson Dufossé",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:38:12.779Z",
                "player_answer": "Mohamed Chaaben",
                "score": 100,
                "valid_answer": "Mohamed Chaaben",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:38:15.101Z",
                "player_answer": "Jean-Baptiste Petit",
                "score": 100,
                "valid_answer": "Jean-Baptiste Petit",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:38:16.655Z",
                "player_answer": "Julien Smadja",
                "score": 100,
                "valid_answer": "Julien Smadja",
                "critical": false
            }, {
                "answered_at": "2017-12-12T19:38:18.402Z",
                "player_answer": "Julien Rossignol",
                "score": 100,
                "valid_answer": "Julien Rossignol",
                "critical": false
            }],
            "bonuses": [],
            "elapsed_time": 379.068,
            "accuracy": 98.06451612903226
        });
});

test('should have score = 102200', t => {
    const game = new Game(
        {
            "player": "jsmadja",
            "started_at": "2017-12-10T12:07:50.946Z",
            "questions": 155,
            "frames": [{
                "answered_at": "2017-12-10T12:07:53.374Z",
                "player_answer": "Julien Estival",
                "valid_answer": "Julien Estival"
            }, {
                "answered_at": "2017-12-10T12:07:55.624Z",
                "player_answer": "Olivier Marquet",
                "valid_answer": "Olivier Marquet"
            }, {
                "answered_at": "2017-12-10T12:08:02.031Z",
                "player_answer": "Géraud Beguin",
                "valid_answer": "Géraud Beguin"
            }, {
                "answered_at": "2017-12-10T12:08:06.184Z",
                "player_answer": "Sylvain Decout",
                "valid_answer": "Sylvain Decout"
            }, {
                "answered_at": "2017-12-10T12:08:08.986Z",
                "player_answer": "Cyril Verdier",
                "valid_answer": "Cyril Verdier"
            }, {
                "answered_at": "2017-12-10T12:08:10.645Z",
                "player_answer": "Clément Rochas",
                "valid_answer": "Clément Rochas"
            }, {
                "answered_at": "2017-12-10T12:08:12.094Z",
                "player_answer": "Anta Aidara",
                "valid_answer": "Anta Aidara"
            }, {
                "answered_at": "2017-12-10T12:08:13.870Z",
                "player_answer": "Moises Trelles",
                "valid_answer": "Moises Trelles"
            }, {
                "answered_at": "2017-12-10T12:08:15.753Z",
                "player_answer": "Mohamed Chaaben",
                "valid_answer": "Mohamed Chaaben"
            }, {
                "answered_at": "2017-12-10T12:08:17.298Z",
                "player_answer": "Charles Dufour",
                "valid_answer": "Charles Dufour"
            }, {
                "answered_at": "2017-12-10T12:08:19.323Z",
                "player_answer": "Laurent Seng",
                "valid_answer": "Laurent Seng"
            }, {
                "answered_at": "2017-12-10T12:08:21.078Z",
                "player_answer": "Kristof Kerninon",
                "valid_answer": "Kristof Kerninon"
            }, {
                "answered_at": "2017-12-10T12:08:22.668Z",
                "player_answer": "Jonathan Raffre",
                "valid_answer": "Jonathan Raffre",
            }, {
                "answered_at": "2017-12-10T12:08:24.524Z",
                "player_answer": "Cathie Nguyen",
                "valid_answer": "Cathie Nguyen"
            }, {
                "answered_at": "2017-12-10T12:08:27.330Z",
                "player_answer": "Thomas Ricart",
                "valid_answer": "Thomas Ricart"
            }, {
                "answered_at": "2017-12-10T12:08:28.797Z",
                "player_answer": "M&#39;hend Ahmedi",
                "valid_answer": "M&#39;hend Ahmedi"
            }, {
                "answered_at": "2017-12-10T12:08:30.423Z",
                "player_answer": "Edouard Siha",
                "valid_answer": "Edouard Siha"
            }, {
                "answered_at": "2017-12-10T12:08:32.037Z",
                "player_answer": "Peter Onneby",
                "valid_answer": "Peter Onneby"
            }, {
                "answered_at": "2017-12-10T12:08:34.087Z",
                "player_answer": "Ramy Temim",
                "valid_answer": "Ramy Temim"
            }, {
                "answered_at": "2017-12-10T12:08:35.442Z",
                "player_answer": "Dmytro Podyachiy",
                "valid_answer": "Dmytro Podyachiy"
            }, {
                "answered_at": "2017-12-10T12:08:38.003Z",
                "player_answer": "Yassir Sennoun",
                "valid_answer": "Yassir Sennoun",
            }, {
                "answered_at": "2017-12-10T12:08:39.624Z",
                "player_answer": "Jeremy Pinsolle",
                "valid_answer": "Jeremy Pinsolle"
            }, {
                "answered_at": "2017-12-10T12:08:41.146Z",
                "player_answer": "Jean-Pascal Thiery",
                "valid_answer": "Jean-Pascal Thiery"
            }, {
                "answered_at": "2017-12-10T12:08:42.749Z",
                "player_answer": "Julien Datour",
                "valid_answer": "Julien Datour"
            }, {
                "answered_at": "2017-12-10T12:08:44.364Z",
                "player_answer": "Lionel Guez",
                "valid_answer": "Lionel Guez"
            }, {
                "answered_at": "2017-12-10T12:08:46.568Z",
                "player_answer": "David Attali",
                "valid_answer": "David Attali"
            }, {
                "answered_at": "2017-12-10T12:08:48.833Z",
                "player_answer": "Vincent Segouin",
                "valid_answer": "Vincent Segouin"
            }, {
                "answered_at": "2017-12-10T12:08:50.782Z",
                "player_answer": "Sébastien Manicon",
                "valid_answer": "Sébastien Manicon"
            }, {
                "answered_at": "2017-12-10T12:08:52.645Z",
                "player_answer": "Michael Ohayon",
                "valid_answer": "Michael Ohayon"
            }, {
                "answered_at": "2017-12-10T12:08:54.579Z",
                "player_answer": "Souhaib Guitouni",
                "valid_answer": "Souhaib Guitouni"
            }, {
                "answered_at": "2017-12-10T12:08:57.062Z",
                "player_answer": "Alexandre Dergham",
                "valid_answer": "Alexandre Dergham"
            }, {
                "answered_at": "2017-12-10T12:08:58.605Z",
                "player_answer": "Alexis Kinsella",
                "valid_answer": "Alexis Kinsella"
            }, {
                "answered_at": "2017-12-10T12:09:00.807Z",
                "player_answer": "Pierre Sendorek",
                "valid_answer": "Pierre Sendorek"
            }, {
                "answered_at": "2017-12-10T12:09:02.115Z",
                "player_answer": "Anthony Giniers",
                "valid_answer": "Anthony Giniers"
            }, {
                "answered_at": "2017-12-10T12:09:03.928Z",
                "player_answer": "Sameh Ben Fredj",
                "valid_answer": "Sameh Ben Fredj"
            }, {
                "answered_at": "2017-12-10T12:09:05.705Z",
                "player_answer": "Estelle Boyer",
                "valid_answer": "Estelle Boyer"
            }, {
                "answered_at": "2017-12-10T12:09:07.689Z",
                "player_answer": "Julien Rossignol",
                "valid_answer": "Julien Rossignol"
            }, {
                "answered_at": "2017-12-10T12:09:10.124Z",
                "player_answer": "Jean-Christophe Pastant",
                "valid_answer": "Jean-Christophe Pastant"
            }, {
                "answered_at": "2017-12-10T12:09:11.879Z",
                "player_answer": "Sergio Dos Santos",
                "valid_answer": "Sergio Dos Santos"
            }, {
                "answered_at": "2017-12-10T12:09:14.259Z",
                "player_answer": "Damien Baron",
                "valid_answer": "Damien Baron"
            }, {
                "answered_at": "2017-12-10T12:09:17.105Z",
                "player_answer": "Olivier Pietremont",
                "valid_answer": "Olivier Pietremont"
            }, {
                "answered_at": "2017-12-10T12:09:18.901Z",
                "player_answer": "Isabelle Roques",
                "valid_answer": "Isabelle Roques"
            }, {
                "answered_at": "2017-12-10T12:09:20.401Z",
                "player_answer": "Loic Divad",
                "valid_answer": "Loic Divad"
            }, {
                "answered_at": "2017-12-10T12:09:21.941Z",
                "player_answer": "Mohamed Hamady",
                "valid_answer": "Mohamed Hamady"
            }, {
                "answered_at": "2017-12-10T12:09:23.551Z",
                "player_answer": "Maxime Dupoisson",
                "valid_answer": "Maxime Dupoisson"
            }, {
                "answered_at": "2017-12-10T12:09:25.251Z",
                "player_answer": "Roderic Pratt",
                "valid_answer": "Roderic Pratt"
            }, {
                "answered_at": "2017-12-10T12:09:26.729Z",
                "player_answer": "Florent Capon",
                "valid_answer": "Florent Capon"
            }, {
                "answered_at": "2017-12-10T12:09:28.388Z",
                "player_answer": "Nicolas Dechandon",
                "valid_answer": "Nicolas Dechandon"
            }, {
                "answered_at": "2017-12-10T12:09:29.971Z",
                "player_answer": "Arthur Sudre",
                "valid_answer": "Arthur Sudre"
            }, {
                "answered_at": "2017-12-10T12:09:32.025Z",
                "player_answer": "Tracy Anicet",
                "valid_answer": "Tracy Anicet"
            }, {
                "answered_at": "2017-12-10T12:09:33.914Z",
                "player_answer": "Sylvain Lequeux",
                "valid_answer": "Sylvain Lequeux"
            }, {
                "answered_at": "2017-12-10T12:09:35.431Z",
                "player_answer": "Benjamin Dupin",
                "valid_answer": "Benjamin Dupin"
            }, {
                "answered_at": "2017-12-10T12:09:37.533Z",
                "player_answer": "Arduino Cascella",
                "valid_answer": "Arduino Cascella"
            }, {
                "answered_at": "2017-12-10T12:09:40.489Z",
                "player_answer": "Benoit Moussaud",
                "valid_answer": "Benoit Moussaud"
            }, {
                "answered_at": "2017-12-10T12:09:41.891Z",
                "player_answer": "Antoine Michaud",
                "valid_answer": "Antoine Michaud"
            }, {
                "answered_at": "2017-12-10T12:09:43.754Z",
                "player_answer": "Mikhail Sadovnikov",
                "valid_answer": "Mikhail Sadovnikov"
            }, {
                "answered_at": "2017-12-10T12:09:45.480Z",
                "player_answer": "Benjamin Lacroix",
                "valid_answer": "Benjamin Lacroix"
            }, {
                "answered_at": "2017-12-10T12:09:47.591Z",
                "player_answer": "Ivan Beauvais",
                "valid_answer": "Ivan Beauvais"
            }, {
                "answered_at": "2017-12-10T12:09:49.244Z",
                "player_answer": "Alexis Tessier",
                "valid_answer": "Alexis Tessier"
            }, {
                "answered_at": "2017-12-10T12:09:51.912Z",
                "player_answer": "Gwenael Bonhommeau",
                "valid_answer": "Gwenael Bonhommeau"
            }, {
                "answered_at": "2017-12-10T12:09:53.588Z",
                "player_answer": "Luc Legardeur",
                "valid_answer": "Luc Legardeur"
            }, {
                "answered_at": "2017-12-10T12:09:55.046Z",
                "player_answer": "Javier Merchan",
                "valid_answer": "Javier Merchan"
            }, {
                "answered_at": "2017-12-10T12:09:56.775Z",
                "player_answer": "Johan Girondeau",
                "valid_answer": "Johan Girondeau"
            }, {
                "answered_at": "2017-12-10T12:09:58.891Z",
                "player_answer": "Maël Razavet",
                "valid_answer": "Maël Razavet"
            }, {
                "answered_at": "2017-12-10T12:10:01.053Z",
                "player_answer": "Bastien Bonnet",
                "valid_answer": "Bastien Bonnet"
            }, {
                "answered_at": "2017-12-10T12:10:02.975Z",
                "player_answer": "Frédéric Courdier",
                "valid_answer": "Frédéric Courdier"
            }, {
                "answered_at": "2017-12-10T12:10:04.851Z",
                "player_answer": "Olivier Ghizzo",
                "valid_answer": "Olivier Ghizzo"
            }, {
                "answered_at": "2017-12-10T12:10:06.710Z",
                "player_answer": "Thibaud Cavin",
                "valid_answer": "Thibaud Cavin"
            }, {
                "answered_at": "2017-12-10T12:10:08.384Z",
                "player_answer": "Zahir Hamroune",
                "valid_answer": "Zahir Hamroune"
            }, {
                "answered_at": "2017-12-10T12:10:10.418Z",
                "player_answer": "Romain Sagean",
                "valid_answer": "Romain Sagean"
            }, {
                "answered_at": "2017-12-10T12:10:12.173Z",
                "player_answer": "Romain Lavancier",
                "valid_answer": "Romain Lavancier"
            }, {
                "answered_at": "2017-12-10T12:10:14.616Z",
                "player_answer": "Wenly Candy",
                "valid_answer": "Wenly Candy"
            }, {
                "answered_at": "2017-12-10T12:10:16.828Z",
                "player_answer": "Christophe Heubès",
                "valid_answer": "Christophe Heubès"
            }, {
                "answered_at": "2017-12-10T12:10:19.879Z",
                "player_answer": "Jérôme Pain",
                "valid_answer": "Jérôme Pain"
            }, {
                "answered_at": "2017-12-10T12:10:21.898Z",
                "player_answer": "Joseph Sayavongsa",
                "valid_answer": "Joseph Sayavongsa"
            }, {
                "answered_at": "2017-12-10T12:10:23.723Z",
                "player_answer": "Nadia Sidhoum",
                "valid_answer": "Nadia Sidhoum"
            }, {
                "answered_at": "2017-12-10T12:10:25.322Z",
                "player_answer": "Pauline Tirman",
                "valid_answer": "Pauline Tirman"
            }, {
                "answered_at": "2017-12-10T12:10:27.300Z",
                "player_answer": "Yannick Lorenzati",
                "valid_answer": "Yannick Lorenzati"
            }, {
                "answered_at": "2017-12-10T12:10:29.432Z",
                "player_answer": "José Martin",
                "valid_answer": "José Martin"
            }, {
                "answered_at": "2017-12-10T12:10:31.390Z",
                "player_answer": "Romain Ardiet",
                "valid_answer": "Romain Ardiet"
            }, {
                "answered_at": "2017-12-10T12:10:34.040Z",
                "player_answer": "Jean-Louis Rigau",
                "valid_answer": "Jean-Louis Rigau"
            }, {
                "answered_at": "2017-12-10T12:10:35.744Z",
                "player_answer": "Marina Tracco",
                "valid_answer": "Marina Tracco"
            }, {
                "answered_at": "2017-12-10T12:10:37.216Z",
                "player_answer": "Arnaud Piroelle",
                "valid_answer": "Arnaud Piroelle"
            }, {
                "answered_at": "2017-12-10T12:10:39.809Z",
                "player_answer": "Renaud Chevalier",
                "valid_answer": "Renaud Chevalier"
            }, {
                "answered_at": "2017-12-10T12:10:42.139Z",
                "player_answer": "Clément Héliou",
                "valid_answer": "Clément Héliou"
            }, {
                "answered_at": "2017-12-10T12:10:43.830Z",
                "player_answer": "Floriane Le Ruyet",
                "valid_answer": "Floriane Le Ruyet"
            }, {
                "answered_at": "2017-12-10T12:10:45.745Z",
                "player_answer": "Nora Bounabat",
                "valid_answer": "Nora Bounabat"
            }, {
                "answered_at": "2017-12-10T12:10:47.316Z",
                "player_answer": "Dara Lim",
                "valid_answer": "Dara Lim"
            }, {
                "answered_at": "2017-12-10T12:10:49.266Z",
                "player_answer": "Mouloud Lounaci",
                "valid_answer": "Mouloud Lounaci"
            }, {
                "answered_at": "2017-12-10T12:10:51.737Z",
                "player_answer": "Simone Civetta",
                "valid_answer": "Simone Civetta"
            }, {
                "answered_at": "2017-12-10T12:10:53.290Z",
                "player_answer": "Alban Dauleu",
                "valid_answer": "Alban Dauleu"
            }, {
                "answered_at": "2017-12-10T12:10:55.381Z",
                "player_answer": "François Laurain",
                "valid_answer": "François Laurain"
            }, {
                "answered_at": "2017-12-10T12:10:57.323Z",
                "player_answer": "Laetitia Jannée",
                "valid_answer": "Laetitia Jannée"
            }, {
                "answered_at": "2017-12-10T12:10:59.276Z",
                "player_answer": "Arnaud Bracchetti",
                "valid_answer": "Arnaud Bracchetti"
            }, {
                "answered_at": "2017-12-10T12:11:00.893Z",
                "player_answer": "Kathleen Cardoso",
                "valid_answer": "Kathleen Cardoso"
            }, {
                "answered_at": "2017-12-10T12:11:02.757Z",
                "player_answer": "Yoann Benoit",
                "valid_answer": "Yoann Benoit"
            }, {
                "answered_at": "2017-12-10T12:11:04.836Z",
                "player_answer": "François Ledamoisel",
                "valid_answer": "François Ledamoisel"
            }, {
                "answered_at": "2017-12-10T12:11:06.499Z",
                "player_answer": "Anne-Sophie Girault",
                "valid_answer": "Anne-Sophie Girault"
            }, {
                "answered_at": "2017-12-10T12:11:08.336Z",
                "player_answer": "Jonathan Norblin",
                "valid_answer": "Jonathan Norblin"
            }, {
                "answered_at": "2017-12-10T12:11:10.321Z",
                "player_answer": "Ingrid Aniotz",
                "valid_answer": "Ingrid Aniotz"
            }, {
                "answered_at": "2017-12-10T12:11:11.972Z",
                "player_answer": "Julien Smadja",
                "valid_answer": "Julien Smadja"
            }, {
                "answered_at": "2017-12-10T12:11:13.779Z",
                "player_answer": "Emmanuel Sciara",
                "valid_answer": "Emmanuel Sciara"
            }, {
                "answered_at": "2017-12-10T12:11:16.832Z",
                "player_answer": "Bastien Charès",
                "valid_answer": "Bastien Charès"
            }, {
                "answered_at": "2017-12-10T12:11:19.035Z",
                "player_answer": "Nicolas Jozwiak",
                "valid_answer": "Nicolas Jozwiak"
            }, {
                "answered_at": "2017-12-10T12:11:20.660Z",
                "player_answer": "Adrien Guiot",
                "valid_answer": "Adrien Guiot"
            }, {
                "answered_at": "2017-12-10T12:11:22.183Z",
                "player_answer": "Bruno Bouchahoua",
                "valid_answer": "Bruno Bouchahoua"
            }, {
                "answered_at": "2017-12-10T12:11:24.439Z",
                "player_answer": "Stéphane Francel",
                "valid_answer": "Stéphane Francel"
            }, {
                "answered_at": "2017-12-10T12:11:27.413Z",
                "player_answer": "Christophe Pelé",
                "valid_answer": "Christophe Pelé"
            }, {
                "answered_at": "2017-12-10T12:11:28.942Z",
                "player_answer": "Qian Jin",
                "valid_answer": "Qian Jin"
            }, {
                "answered_at": "2017-12-10T12:11:30.415Z",
                "player_answer": "Antoine Le Taxin",
                "valid_answer": "Antoine Le Taxin"
            }, {
                "answered_at": "2017-12-10T12:11:32.389Z",
                "player_answer": "Loic Bigot",
                "valid_answer": "Loic Bigot"
            }, {
                "answered_at": "2017-12-10T12:11:35.240Z",
                "player_answer": "Walid Haouri",
                "valid_answer": "Walid Haouri"
            }, {
                "answered_at": "2017-12-10T12:11:36.660Z",
                "player_answer": "Laurent Russier",
                "valid_answer": "Laurent Russier"
            }, {
                "answered_at": "2017-12-10T12:11:38.477Z",
                "player_answer": "Noémie Verscheure",
                "valid_answer": "Noémie Verscheure"
            }, {
                "answered_at": "2017-12-10T12:11:39.991Z",
                "player_answer": "Alban Phelip",
                "valid_answer": "Alban Phelip"
            }, {
                "answered_at": "2017-12-10T12:11:41.760Z",
                "player_answer": "Fabien Mirault",
                "valid_answer": "Fabien Mirault"
            }, {
                "answered_at": "2017-12-10T12:11:43.350Z",
                "player_answer": "Jean-Baptiste Petit",
                "valid_answer": "Jean-Baptiste Petit"
            }, {
                "answered_at": "2017-12-10T12:11:45.041Z",
                "player_answer": "Nicolas Laille",
                "valid_answer": "Nicolas Laille"
            }, {
                "answered_at": "2017-12-10T12:11:47.088Z",
                "player_answer": "Ludovic Perot",
                "valid_answer": "Ludovic Perot"
            }, {
                "answered_at": "2017-12-10T12:11:48.829Z",
                "player_answer": "Adrien Kvaternik",
                "valid_answer": "Adrien Kvaternik"
            }, {
                "answered_at": "2017-12-10T12:11:51.503Z",
                "player_answer": "Fares Oueslati",
                "valid_answer": "Fares Oueslati"
            }, {
                "answered_at": "2017-12-10T12:11:53.970Z",
                "player_answer": "Joachim Rousseau",
                "valid_answer": "Joachim Rousseau"
            }, {
                "answered_at": "2017-12-10T12:11:55.752Z",
                "player_answer": "Giulia Bianchi",
                "valid_answer": "Giulia Bianchi"
            }, {
                "answered_at": "2017-12-10T12:11:57.065Z",
                "player_answer": "Edern Hotte",
                "valid_answer": "Edern Hotte"
            }, {
                "answered_at": "2017-12-10T12:11:58.394Z",
                "player_answer": "Ludovic Ladeu",
                "valid_answer": "Ludovic Ladeu"
            }, {
                "answered_at": "2017-12-10T12:12:00.544Z",
                "player_answer": "Thomas Auffredou",
                "valid_answer": "Thomas Auffredou"
            }, {
                "answered_at": "2017-12-10T12:12:02.098Z",
                "player_answer": "Alexandre Cohen",
                "valid_answer": "Alexandre Cohen"
            }, {
                "answered_at": "2017-12-10T12:12:03.960Z",
                "player_answer": "Harry Jumeau",
                "valid_answer": "Harry Jumeau"
            }, {
                "answered_at": "2017-12-10T12:12:05.572Z",
                "player_answer": "Stéphane Guedon",
                "valid_answer": "Stéphane Guedon"
            }, {
                "answered_at": "2017-12-10T12:12:07.149Z",
                "player_answer": "Diana Ortega",
                "valid_answer": "Diana Ortega"
            }, {
                "answered_at": "2017-12-10T12:12:08.913Z",
                "player_answer": "Josselin Moulay",
                "valid_answer": "Josselin Moulay"
            }, {
                "answered_at": "2017-12-10T12:12:10.859Z",
                "player_answer": "Laurène Thenoz",
                "valid_answer": "Laurène Thenoz"
            }, {
                "answered_at": "2017-12-10T12:12:12.789Z",
                "player_answer": "Michael Werner",
                "valid_answer": "Michael Werner"
            }, {
                "answered_at": "2017-12-10T12:12:14.836Z",
                "player_answer": "Thomas Simonnet",
                "valid_answer": "Thomas Simonnet"
            }, {
                "answered_at": "2017-12-10T12:12:16.389Z",
                "player_answer": "Julien Simon",
                "valid_answer": "Julien Simon"
            }, {
                "answered_at": "2017-12-10T12:12:18.549Z",
                "player_answer": "Régis Allais",
                "valid_answer": "Régis Allais"
            }, {
                "answered_at": "2017-12-10T12:12:20.170Z",
                "player_answer": "Alexis Chotard",
                "valid_answer": "Alexis Chotard"
            }, {
                "answered_at": "2017-12-10T12:12:22.347Z",
                "player_answer": "Pierre-Philippe Beauchemin",
                "valid_answer": "Pierre-Philippe Beauchemin"
            }, {
                "answered_at": "2017-12-10T12:12:24.038Z",
                "player_answer": "Antoine Marcou",
                "valid_answer": "Antoine Marcou"
            }, {
                "answered_at": "2017-12-10T12:12:28.456Z",
                "player_answer": "Morgane Eckert",
                "valid_answer": "Morgane Eckert"
            }, {
                "answered_at": "2017-12-10T12:12:30.461Z",
                "player_answer": "Patryk Gruszka",
                "valid_answer": "Patryk Gruszka"
            }, {
                "answered_at": "2017-12-10T12:12:32.362Z",
                "player_answer": "Sandra Pietrowska",
                "valid_answer": "Sandra Pietrowska"
            }, {
                "answered_at": "2017-12-10T12:12:34.221Z",
                "player_answer": "Richard Mathis",
                "valid_answer": "Richard Mathis"
            }, {
                "answered_at": "2017-12-10T12:12:35.883Z",
                "player_answer": "Julien Bonachera",
                "valid_answer": "Julien Bonachera"
            }, {
                "answered_at": "2017-12-10T12:12:37.409Z",
                "player_answer": "Gérôme Egron",
                "valid_answer": "Gérôme Egron"
            }, {
                "answered_at": "2017-12-10T12:12:39.030Z",
                "player_answer": "Florian Desrousseaux",
                "valid_answer": "Florian Desrousseaux"
            }, {
                "answered_at": "2017-12-10T12:12:40.781Z",
                "player_answer": "Sara Rodrigues",
                "valid_answer": "Sara Rodrigues"
            }, {
                "answered_at": "2017-12-10T12:12:42.495Z",
                "player_answer": "Paul-Guillaume Dejardin",
                "valid_answer": "Paul-Guillaume Dejardin"
            }, {
                "answered_at": "2017-12-10T12:12:44.321Z",
                "player_answer": "Aurore De Amaral",
                "valid_answer": "Aurore De Amaral"
            }, {
                "answered_at": "2017-12-10T12:12:46.199Z",
                "player_answer": "Sarah Buisson",
                "valid_answer": "Sarah Buisson"
            }, {
                "answered_at": "2017-12-10T12:12:47.720Z",
                "player_answer": "Anne Beauchart",
                "valid_answer": "Anne Beauchart"
            }, {
                "answered_at": "2017-12-10T12:12:49.705Z",
                "player_answer": "Thomas Depinoy",
                "valid_answer": "Thomas Depinoy"
            }, {
                "answered_at": "2017-12-10T12:12:52.049Z",
                "player_answer": "Jean-Baptiste Claramonte",
                "valid_answer": "Jean-Baptiste Claramonte"
            }, {
                "answered_at": "2017-12-10T12:12:53.951Z",
                "player_answer": "Thomas Champion",
                "valid_answer": "Thomas Champion"
            }, {
                "answered_at": "2017-12-10T12:12:56.294Z",
                "player_answer": "Nelson Dufossé",
                "valid_answer": "Nelson Dufossé"
            }],
            "elapsed_time": 305.348
        });
    t.deepEqual(game.detail,
        {
            "player": "jsmadja",
            "started_at": "2017-12-10T12:07:50.946Z",
            "questions": 155,
            "score": 102200,
            "frames": [{
                "answered_at": "2017-12-10T12:07:53.374Z",
                "player_answer": "Julien Estival",
                "score": 100,
                "valid_answer": "Julien Estival",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:07:55.624Z",
                "player_answer": "Olivier Marquet",
                "score": 100,
                "valid_answer": "Olivier Marquet",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:02.031Z",
                "player_answer": "Géraud Beguin",
                "score": 400,
                "valid_answer": "Géraud Beguin",
                "critical": true
            }, {
                "answered_at": "2017-12-10T12:08:06.184Z",
                "player_answer": "Sylvain Decout",
                "score": 100,
                "valid_answer": "Sylvain Decout",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:08.986Z",
                "player_answer": "Cyril Verdier",
                "score": 100,
                "valid_answer": "Cyril Verdier",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:10.645Z",
                "player_answer": "Clément Rochas",
                "score": 100,
                "valid_answer": "Clément Rochas",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:12.094Z",
                "player_answer": "Anta Aidara",
                "score": 100,
                "valid_answer": "Anta Aidara",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:13.870Z",
                "player_answer": "Moises Trelles",
                "score": 900,
                "valid_answer": "Moises Trelles",
                "critical": true
            }, {
                "answered_at": "2017-12-10T12:08:15.753Z",
                "player_answer": "Mohamed Chaaben",
                "score": 100,
                "valid_answer": "Mohamed Chaaben",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:17.298Z",
                "player_answer": "Charles Dufour",
                "score": 100,
                "valid_answer": "Charles Dufour",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:19.323Z",
                "player_answer": "Laurent Seng",
                "score": 100,
                "valid_answer": "Laurent Seng",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:21.078Z",
                "player_answer": "Kristof Kerninon",
                "score": 100,
                "valid_answer": "Kristof Kerninon",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:22.668Z",
                "player_answer": "Jonathan Raffre",
                "score": 1400,
                "valid_answer": "Jonathan Raffre",
                "critical": true
            }, {
                "answered_at": "2017-12-10T12:08:24.524Z",
                "player_answer": "Cathie Nguyen",
                "score": 100,
                "valid_answer": "Cathie Nguyen",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:27.330Z",
                "player_answer": "Thomas Ricart",
                "score": 100,
                "valid_answer": "Thomas Ricart",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:28.797Z",
                "player_answer": "M&#39;hend Ahmedi",
                "score": 100,
                "valid_answer": "M&#39;hend Ahmedi",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:30.423Z",
                "player_answer": "Edouard Siha",
                "score": 100,
                "valid_answer": "Edouard Siha",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:32.037Z",
                "player_answer": "Peter Onneby",
                "score": 100,
                "valid_answer": "Peter Onneby",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:34.087Z",
                "player_answer": "Ramy Temim",
                "score": 100,
                "valid_answer": "Ramy Temim",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:35.442Z",
                "player_answer": "Dmytro Podyachiy",
                "score": 100,
                "valid_answer": "Dmytro Podyachiy",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:38.003Z",
                "player_answer": "Yassir Sennoun",
                "score": 2200,
                "valid_answer": "Yassir Sennoun",
                "critical": true
            }, {
                "answered_at": "2017-12-10T12:08:39.624Z",
                "player_answer": "Jeremy Pinsolle",
                "score": 100,
                "valid_answer": "Jeremy Pinsolle",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:41.146Z",
                "player_answer": "Jean-Pascal Thiery",
                "score": 100,
                "valid_answer": "Jean-Pascal Thiery",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:42.749Z",
                "player_answer": "Julien Datour",
                "score": 100,
                "valid_answer": "Julien Datour",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:44.364Z",
                "player_answer": "Lionel Guez",
                "score": 100,
                "valid_answer": "Lionel Guez",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:46.568Z",
                "player_answer": "David Attali",
                "score": 100,
                "valid_answer": "David Attali",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:48.833Z",
                "player_answer": "Vincent Segouin",
                "score": 100,
                "valid_answer": "Vincent Segouin",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:50.782Z",
                "player_answer": "Sébastien Manicon",
                "score": 100,
                "valid_answer": "Sébastien Manicon",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:52.645Z",
                "player_answer": "Michael Ohayon",
                "score": 100,
                "valid_answer": "Michael Ohayon",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:54.579Z",
                "player_answer": "Souhaib Guitouni",
                "score": 100,
                "valid_answer": "Souhaib Guitouni",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:57.062Z",
                "player_answer": "Alexandre Dergham",
                "score": 100,
                "valid_answer": "Alexandre Dergham",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:08:58.605Z",
                "player_answer": "Alexis Kinsella",
                "score": 100,
                "valid_answer": "Alexis Kinsella",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:00.807Z",
                "player_answer": "Pierre Sendorek",
                "score": 100,
                "valid_answer": "Pierre Sendorek",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:02.115Z",
                "player_answer": "Anthony Giniers",
                "score": 3500,
                "valid_answer": "Anthony Giniers",
                "critical": true
            }, {
                "answered_at": "2017-12-10T12:09:03.928Z",
                "player_answer": "Sameh Ben Fredj",
                "score": 100,
                "valid_answer": "Sameh Ben Fredj",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:05.705Z",
                "player_answer": "Estelle Boyer",
                "score": 100,
                "valid_answer": "Estelle Boyer",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:07.689Z",
                "player_answer": "Julien Rossignol",
                "score": 100,
                "valid_answer": "Julien Rossignol",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:10.124Z",
                "player_answer": "Jean-Christophe Pastant",
                "score": 100,
                "valid_answer": "Jean-Christophe Pastant",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:11.879Z",
                "player_answer": "Sergio Dos Santos",
                "score": 100,
                "valid_answer": "Sergio Dos Santos",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:14.259Z",
                "player_answer": "Damien Baron",
                "score": 100,
                "valid_answer": "Damien Baron",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:17.105Z",
                "player_answer": "Olivier Pietremont",
                "score": 100,
                "valid_answer": "Olivier Pietremont",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:18.901Z",
                "player_answer": "Isabelle Roques",
                "score": 100,
                "valid_answer": "Isabelle Roques",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:20.401Z",
                "player_answer": "Loic Divad",
                "score": 100,
                "valid_answer": "Loic Divad",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:21.941Z",
                "player_answer": "Mohamed Hamady",
                "score": 100,
                "valid_answer": "Mohamed Hamady",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:23.551Z",
                "player_answer": "Maxime Dupoisson",
                "score": 100,
                "valid_answer": "Maxime Dupoisson",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:25.251Z",
                "player_answer": "Roderic Pratt",
                "score": 100,
                "valid_answer": "Roderic Pratt",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:26.729Z",
                "player_answer": "Florent Capon",
                "score": 100,
                "valid_answer": "Florent Capon",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:28.388Z",
                "player_answer": "Nicolas Dechandon",
                "score": 100,
                "valid_answer": "Nicolas Dechandon",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:29.971Z",
                "player_answer": "Arthur Sudre",
                "score": 100,
                "valid_answer": "Arthur Sudre",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:32.025Z",
                "player_answer": "Tracy Anicet",
                "score": 100,
                "valid_answer": "Tracy Anicet",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:33.914Z",
                "player_answer": "Sylvain Lequeux",
                "score": 100,
                "valid_answer": "Sylvain Lequeux",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:35.431Z",
                "player_answer": "Benjamin Dupin",
                "score": 100,
                "valid_answer": "Benjamin Dupin",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:37.533Z",
                "player_answer": "Arduino Cascella",
                "score": 100,
                "valid_answer": "Arduino Cascella",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:40.489Z",
                "player_answer": "Benoit Moussaud",
                "score": 100,
                "valid_answer": "Benoit Moussaud",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:41.891Z",
                "player_answer": "Antoine Michaud",
                "score": 5600,
                "valid_answer": "Antoine Michaud",
                "critical": true
            }, {
                "answered_at": "2017-12-10T12:09:43.754Z",
                "player_answer": "Mikhail Sadovnikov",
                "score": 100,
                "valid_answer": "Mikhail Sadovnikov",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:45.480Z",
                "player_answer": "Benjamin Lacroix",
                "score": 100,
                "valid_answer": "Benjamin Lacroix",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:47.591Z",
                "player_answer": "Ivan Beauvais",
                "score": 100,
                "valid_answer": "Ivan Beauvais",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:49.244Z",
                "player_answer": "Alexis Tessier",
                "score": 100,
                "valid_answer": "Alexis Tessier",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:51.912Z",
                "player_answer": "Gwenael Bonhommeau",
                "score": 100,
                "valid_answer": "Gwenael Bonhommeau",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:53.588Z",
                "player_answer": "Luc Legardeur",
                "score": 100,
                "valid_answer": "Luc Legardeur",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:55.046Z",
                "player_answer": "Javier Merchan",
                "score": 100,
                "valid_answer": "Javier Merchan",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:56.775Z",
                "player_answer": "Johan Girondeau",
                "score": 100,
                "valid_answer": "Johan Girondeau",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:09:58.891Z",
                "player_answer": "Maël Razavet",
                "score": 100,
                "valid_answer": "Maël Razavet",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:01.053Z",
                "player_answer": "Bastien Bonnet",
                "score": 100,
                "valid_answer": "Bastien Bonnet",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:02.975Z",
                "player_answer": "Frédéric Courdier",
                "score": 100,
                "valid_answer": "Frédéric Courdier",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:04.851Z",
                "player_answer": "Olivier Ghizzo",
                "score": 100,
                "valid_answer": "Olivier Ghizzo",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:06.710Z",
                "player_answer": "Thibaud Cavin",
                "score": 100,
                "valid_answer": "Thibaud Cavin",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:08.384Z",
                "player_answer": "Zahir Hamroune",
                "score": 100,
                "valid_answer": "Zahir Hamroune",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:10.418Z",
                "player_answer": "Romain Sagean",
                "score": 100,
                "valid_answer": "Romain Sagean",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:12.173Z",
                "player_answer": "Romain Lavancier",
                "score": 100,
                "valid_answer": "Romain Lavancier",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:14.616Z",
                "player_answer": "Wenly Candy",
                "score": 100,
                "valid_answer": "Wenly Candy",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:16.828Z",
                "player_answer": "Christophe Heubès",
                "score": 100,
                "valid_answer": "Christophe Heubès",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:19.879Z",
                "player_answer": "Jérôme Pain",
                "score": 100,
                "valid_answer": "Jérôme Pain",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:21.898Z",
                "player_answer": "Joseph Sayavongsa",
                "score": 100,
                "valid_answer": "Joseph Sayavongsa",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:23.723Z",
                "player_answer": "Nadia Sidhoum",
                "score": 100,
                "valid_answer": "Nadia Sidhoum",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:25.322Z",
                "player_answer": "Pauline Tirman",
                "score": 100,
                "valid_answer": "Pauline Tirman",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:27.300Z",
                "player_answer": "Yannick Lorenzati",
                "score": 100,
                "valid_answer": "Yannick Lorenzati",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:29.432Z",
                "player_answer": "José Martin",
                "score": 100,
                "valid_answer": "José Martin",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:31.390Z",
                "player_answer": "Romain Ardiet",
                "score": 100,
                "valid_answer": "Romain Ardiet",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:34.040Z",
                "player_answer": "Jean-Louis Rigau",
                "score": 100,
                "valid_answer": "Jean-Louis Rigau",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:35.744Z",
                "player_answer": "Marina Tracco",
                "score": 100,
                "valid_answer": "Marina Tracco",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:37.216Z",
                "player_answer": "Arnaud Piroelle",
                "score": 100,
                "valid_answer": "Arnaud Piroelle",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:39.809Z",
                "player_answer": "Renaud Chevalier",
                "score": 100,
                "valid_answer": "Renaud Chevalier",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:42.139Z",
                "player_answer": "Clément Héliou",
                "score": 100,
                "valid_answer": "Clément Héliou",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:43.830Z",
                "player_answer": "Floriane Le Ruyet",
                "score": 100,
                "valid_answer": "Floriane Le Ruyet",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:45.745Z",
                "player_answer": "Nora Bounabat",
                "score": 100,
                "valid_answer": "Nora Bounabat",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:47.316Z",
                "player_answer": "Dara Lim",
                "score": 100,
                "valid_answer": "Dara Lim",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:49.266Z",
                "player_answer": "Mouloud Lounaci",
                "score": 9000,
                "valid_answer": "Mouloud Lounaci",
                "critical": true
            }, {
                "answered_at": "2017-12-10T12:10:51.737Z",
                "player_answer": "Simone Civetta",
                "score": 100,
                "valid_answer": "Simone Civetta",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:53.290Z",
                "player_answer": "Alban Dauleu",
                "score": 100,
                "valid_answer": "Alban Dauleu",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:55.381Z",
                "player_answer": "François Laurain",
                "score": 100,
                "valid_answer": "François Laurain",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:57.323Z",
                "player_answer": "Laetitia Jannée",
                "score": 100,
                "valid_answer": "Laetitia Jannée",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:10:59.276Z",
                "player_answer": "Arnaud Bracchetti",
                "score": 100,
                "valid_answer": "Arnaud Bracchetti",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:00.893Z",
                "player_answer": "Kathleen Cardoso",
                "score": 100,
                "valid_answer": "Kathleen Cardoso",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:02.757Z",
                "player_answer": "Yoann Benoit",
                "score": 100,
                "valid_answer": "Yoann Benoit",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:04.836Z",
                "player_answer": "François Ledamoisel",
                "score": 100,
                "valid_answer": "François Ledamoisel",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:06.499Z",
                "player_answer": "Anne-Sophie Girault",
                "score": 100,
                "valid_answer": "Anne-Sophie Girault",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:08.336Z",
                "player_answer": "Jonathan Norblin",
                "score": 100,
                "valid_answer": "Jonathan Norblin",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:10.321Z",
                "player_answer": "Ingrid Aniotz",
                "score": 100,
                "valid_answer": "Ingrid Aniotz",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:11.972Z",
                "player_answer": "Julien Smadja",
                "score": 100,
                "valid_answer": "Julien Smadja",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:13.779Z",
                "player_answer": "Emmanuel Sciara",
                "score": 100,
                "valid_answer": "Emmanuel Sciara",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:16.832Z",
                "player_answer": "Bastien Charès",
                "score": 100,
                "valid_answer": "Bastien Charès",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:19.035Z",
                "player_answer": "Nicolas Jozwiak",
                "score": 100,
                "valid_answer": "Nicolas Jozwiak",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:20.660Z",
                "player_answer": "Adrien Guiot",
                "score": 100,
                "valid_answer": "Adrien Guiot",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:22.183Z",
                "player_answer": "Bruno Bouchahoua",
                "score": 100,
                "valid_answer": "Bruno Bouchahoua",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:24.439Z",
                "player_answer": "Stéphane Francel",
                "score": 100,
                "valid_answer": "Stéphane Francel",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:27.413Z",
                "player_answer": "Christophe Pelé",
                "score": 100,
                "valid_answer": "Christophe Pelé",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:28.942Z",
                "player_answer": "Qian Jin",
                "score": 100,
                "valid_answer": "Qian Jin",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:30.415Z",
                "player_answer": "Antoine Le Taxin",
                "score": 100,
                "valid_answer": "Antoine Le Taxin",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:32.389Z",
                "player_answer": "Loic Bigot",
                "score": 100,
                "valid_answer": "Loic Bigot",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:35.240Z",
                "player_answer": "Walid Haouri",
                "score": 100,
                "valid_answer": "Walid Haouri",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:36.660Z",
                "player_answer": "Laurent Russier",
                "score": 100,
                "valid_answer": "Laurent Russier",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:38.477Z",
                "player_answer": "Noémie Verscheure",
                "score": 100,
                "valid_answer": "Noémie Verscheure",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:39.991Z",
                "player_answer": "Alban Phelip",
                "score": 100,
                "valid_answer": "Alban Phelip",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:41.760Z",
                "player_answer": "Fabien Mirault",
                "score": 100,
                "valid_answer": "Fabien Mirault",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:43.350Z",
                "player_answer": "Jean-Baptiste Petit",
                "score": 100,
                "valid_answer": "Jean-Baptiste Petit",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:45.041Z",
                "player_answer": "Nicolas Laille",
                "score": 100,
                "valid_answer": "Nicolas Laille",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:47.088Z",
                "player_answer": "Ludovic Perot",
                "score": 100,
                "valid_answer": "Ludovic Perot",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:48.829Z",
                "player_answer": "Adrien Kvaternik",
                "score": 100,
                "valid_answer": "Adrien Kvaternik",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:51.503Z",
                "player_answer": "Fares Oueslati",
                "score": 100,
                "valid_answer": "Fares Oueslati",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:53.970Z",
                "player_answer": "Joachim Rousseau",
                "score": 100,
                "valid_answer": "Joachim Rousseau",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:55.752Z",
                "player_answer": "Giulia Bianchi",
                "score": 100,
                "valid_answer": "Giulia Bianchi",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:57.065Z",
                "player_answer": "Edern Hotte",
                "score": 100,
                "valid_answer": "Edern Hotte",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:11:58.394Z",
                "player_answer": "Ludovic Ladeu",
                "score": 100,
                "valid_answer": "Ludovic Ladeu",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:00.544Z",
                "player_answer": "Thomas Auffredou",
                "score": 100,
                "valid_answer": "Thomas Auffredou",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:02.098Z",
                "player_answer": "Alexandre Cohen",
                "score": 100,
                "valid_answer": "Alexandre Cohen",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:03.960Z",
                "player_answer": "Harry Jumeau",
                "score": 100,
                "valid_answer": "Harry Jumeau",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:05.572Z",
                "player_answer": "Stéphane Guedon",
                "score": 100,
                "valid_answer": "Stéphane Guedon",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:07.149Z",
                "player_answer": "Diana Ortega",
                "score": 100,
                "valid_answer": "Diana Ortega",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:08.913Z",
                "player_answer": "Josselin Moulay",
                "score": 100,
                "valid_answer": "Josselin Moulay",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:10.859Z",
                "player_answer": "Laurène Thenoz",
                "score": 100,
                "valid_answer": "Laurène Thenoz",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:12.789Z",
                "player_answer": "Michael Werner",
                "score": 100,
                "valid_answer": "Michael Werner",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:14.836Z",
                "player_answer": "Thomas Simonnet",
                "score": 100,
                "valid_answer": "Thomas Simonnet",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:16.389Z",
                "player_answer": "Julien Simon",
                "score": 100,
                "valid_answer": "Julien Simon",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:18.549Z",
                "player_answer": "Régis Allais",
                "score": 100,
                "valid_answer": "Régis Allais",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:20.170Z",
                "player_answer": "Alexis Chotard",
                "score": 100,
                "valid_answer": "Alexis Chotard",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:22.347Z",
                "player_answer": "Pierre-Philippe Beauchemin",
                "score": 100,
                "valid_answer": "Pierre-Philippe Beauchemin",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:24.038Z",
                "player_answer": "Antoine Marcou",
                "score": 100,
                "valid_answer": "Antoine Marcou",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:28.456Z",
                "player_answer": "Morgane Eckert",
                "score": 100,
                "valid_answer": "Morgane Eckert",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:30.461Z",
                "player_answer": "Patryk Gruszka",
                "score": 100,
                "valid_answer": "Patryk Gruszka",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:32.362Z",
                "player_answer": "Sandra Pietrowska",
                "score": 100,
                "valid_answer": "Sandra Pietrowska",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:34.221Z",
                "player_answer": "Richard Mathis",
                "score": 100,
                "valid_answer": "Richard Mathis",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:35.883Z",
                "player_answer": "Julien Bonachera",
                "score": 14500,
                "valid_answer": "Julien Bonachera",
                "critical": true
            }, {
                "answered_at": "2017-12-10T12:12:37.409Z",
                "player_answer": "Gérôme Egron",
                "score": 100,
                "valid_answer": "Gérôme Egron",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:39.030Z",
                "player_answer": "Florian Desrousseaux",
                "score": 100,
                "valid_answer": "Florian Desrousseaux",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:40.781Z",
                "player_answer": "Sara Rodrigues",
                "score": 100,
                "valid_answer": "Sara Rodrigues",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:42.495Z",
                "player_answer": "Paul-Guillaume Dejardin",
                "score": 100,
                "valid_answer": "Paul-Guillaume Dejardin",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:44.321Z",
                "player_answer": "Aurore De Amaral",
                "score": 100,
                "valid_answer": "Aurore De Amaral",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:46.199Z",
                "player_answer": "Sarah Buisson",
                "score": 100,
                "valid_answer": "Sarah Buisson",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:47.720Z",
                "player_answer": "Anne Beauchart",
                "score": 100,
                "valid_answer": "Anne Beauchart",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:49.705Z",
                "player_answer": "Thomas Depinoy",
                "score": 100,
                "valid_answer": "Thomas Depinoy",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:52.049Z",
                "player_answer": "Jean-Baptiste Claramonte",
                "score": 100,
                "valid_answer": "Jean-Baptiste Claramonte",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:53.951Z",
                "player_answer": "Thomas Champion",
                "score": 100,
                "valid_answer": "Thomas Champion",
                "critical": false
            }, {
                "answered_at": "2017-12-10T12:12:56.294Z",
                "player_answer": "Nelson Dufossé",
                "score": 100,
                "valid_answer": "Nelson Dufossé",
                "critical": false
            }],
            "bonuses": [{ "type": "NO_MISS", "score": 50000 }],
            "elapsed_time": 305.348,
            "accuracy": 100
        });
});