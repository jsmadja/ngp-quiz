import _ from 'lodash';

const data = [
  { file: 'wh_geegus.gif', name: 'Geegus', gender: 'm' },
  { file: 'wh2_brocken.jpg', name: 'Brocken', gender: 'm' },
  { file: 'wh2_dio.jpg', name: 'Dio', gender: 'm' },
  { file: 'wh2_neogeegus.png', name: 'Neo Geegus', gender: 'm' },
  { file: 'wh2_dragon.jpg', name: 'Kim Dragon', gender: 'm' },
  { file: 'wh2_erick.jpg', name: 'Erick', gender: 'm' },
  { file: 'wh2_fuuma.jpg', name: 'Fuuma Kotaro', gender: 'm' },
  { file: 'wh2_hanzou.jpg', name: 'Hanzo Hattori', gender: 'm' },
  { file: 'wh2_janne.jpg', name: 'Janne D\'Arc', gender: 'f' },
  { file: 'wh2_jcarn.jpg', name: 'Julius Carn', gender: 'm' },
  { file: 'wh2_jmax.jpg', name: 'Johnny Maximum', gender: 'm' },
  { file: 'wh2_kidd.jpg', name: 'Captain Kidd', gender: 'm' },
  { file: 'wh2_mudman.jpg', name: 'Mudman', gender: 'm' },
  { file: 'wh2_muscle.jpg', name: 'Muscle Power', gender: 'm' },
  { file: 'wh2_rasputin.jpg', name: 'Rasputin', gender: 'm' },
  { file: 'wh2_ryoko.jpg', name: 'Ryôko Izumo', gender: 'f' },
  { file: 'wh2_shura.jpg', name: 'Shura', gender: 'm' },
  { file: 'wh2jet_jack.jpg', name: 'Jack', gender: 'm' },
  { file: 'wh2jet_ryofu.gif', name: 'Ryofu', gender: 'm' },
  { file: 'wh2jet_zeus.gif', name: 'Zeus', gender: 'm' },
  { file: 'kof94_andy.jpg', name: 'Andy Bogard', gender: 'm' },
  { file: 'kof94_brian.jpg', name: 'Brian Battler', gender: 'm' },
  { file: 'kof94_choi.jpg', name: 'Choi Bounge', gender: 'm' },
  { file: 'kof94_heavyd.jpg', name: 'Heavy D!', gender: 'm' },
  { file: 'kof94_kensou.jpg', name: 'Sie Kensou', gender: 'm' },
  { file: 'kof94_kyo.jpg', name: 'Kyo Kusanagi', gender: 'm' },
  { file: 'kof94_ralf.jpg', name: 'Ralf Jones', gender: 'm' },
  { file: 'kof94_ryo.jpg', name: 'Ryo Sakazaki', gender: 'm' },
  { file: 'kof94_yuri.jpg', name: 'Yuri Sakazaki', gender: 'f' },
  { file: 'kof94_athena.jpg', name: 'Athena Asamiya', gender: 'f' },
  { file: 'kof94_chang.jpg', name: 'Chang Koehan', gender: 'm' },
  { file: 'kof94_clark.jpg', name: 'Clark Still', gender: 'm' },
  { file: 'kof94_heidern.jpg', name: 'Heidern', gender: 'm' },
  { file: 'kof94_kim.jpg', name: 'Kim Kaphwan', gender: 'm' },
  { file: 'kof94_lucky.jpg', name: 'Lucky Glauber', gender: 'm' },
  { file: 'kof94_robert.jpg', name: 'Robert Garcia', gender: 'm' },
  { file: 'kof94_takuma.jpg', name: 'Takuma Sakazaki', gender: 'm' },
  { file: 'kof94_benimaru.jpg', name: 'Benimaru Nikaido', gender: 'm' },
  { file: 'kof94_chin.jpg', name: 'Chin Gentsai', gender: 'm' },
  { file: 'kof94_daimon.jpg', name: 'Goro Daimon', gender: 'm' },
  { file: 'kof94_joe.jpg', name: 'Joe Higashi', gender: 'm' },
  { file: 'kof94_king.jpg', name: 'King', gender: 'f' },
  { file: 'kof94_mai.jpg', name: 'Mai Shiranui', gender: 'f' },
  { file: 'kof94_rugal.jpg', name: 'Rugal Bernsteain', gender: 'm' },
  { file: 'kof94_terry.jpg', name: 'Terry Bogard', gender: 'm' },
  { file: 'motw_butt.jpg', name: 'Khushnood Butt', gender: 'm' },
  { file: 'motw_hokutomaru.jpg', name: 'Hokutomaru', gender: 'm' },
  { file: 'motw_kevin.jpg', name: 'Kevin Rian', gender: 'm' },
  { file: 'motw_donghwan.jpg', name: 'Kim Dong Hwan', gender: 'm' },
  { file: 'motw_hotaru.jpg', name: 'Hotaru Futaba', gender: 'f' },
  { file: 'motw_rock.jpg', name: 'Rock Howard', gender: 'm' },
  { file: 'motw_freeman.jpg', name: 'Freeman', gender: 'm' },
  { file: 'motw_jaehoon.jpg', name: 'Kim Jae Hoon', gender: 'm' },
  { file: 'motw_tizoc.jpg', name: 'Tizoc', gender: 'm' },
  { file: 'motw_gato.jpg', name: 'Gato', gender: 'm' },
  { file: 'motw_jenet.jpg', name: 'Bonne Jenet', gender: 'f' },
  { file: 'motw_grant.jpg', name: 'Grant', gender: 'm' },
  { file: 'motw_kain.jpg', name: 'Kain R. Heinlein', gender: 'm' },
  { file: 'mslug_eri.jpg', name: 'Eri Kasamoto', gender: 'f' },
  { file: 'mslug_fiolina.jpg', name: 'Fiolina Germi', gender: 'f' },
  { file: 'mslug_marco.jpg', name: 'Marco Rossi', gender: 'm' },
  { file: 'mslug_mars.jpg', name: 'Mars People', gender: 'm' },
  { file: 'mslug_morden.jpg', name: 'Donald Morden', gender: 'm' },
  { file: 'mslug_rumi.gif', name: 'Rumi Aikawa', gender: 'f' },
  { file: 'mslug_tarma.jpg', name: 'Tarma Roving', gender: 'm' },
  { file: 'bfight_bking.gif', name: 'Billy King', gender: 'm' },
  { file: 'bfight_duke.gif', name: 'Duke Edwards', gender: 'm' },
  { file: 'bfight_ryu.gif', name: 'Ryu Saeba', gender: 'm' },
  { file: 'ragnagard_susano.png', name: 'Susano', gender: 'm' },
  { file: 'ragnagard_benten.png', name: 'Benten', gender: 'f' },
  { file: 'ragnagard_chichi_nene.png', name: 'Chichi & Nene', gender: 'f' },
  { file: 'ragnagard_songoku.png', name: 'Son Gokû', gender: 'm' },
  { file: 'ragnagard_binten.png', name: 'Binten', gender: 'm' },
  { file: 'ragnagard_suyten.png', name: 'Syuten-Dozi', gender: 'm' },
  { file: 'ragnagard_seena.png', name: 'Seena', gender: 'f' },
  { file: 'ragnagard_igret.png', name: 'Igret', gender: 'm' },

  { file: 'aof_jack.jpg', name: 'Jack Turner', gender: 'm' },
  { file: 'aof_john.jpg', name: 'John Crawley', gender: 'm' },
  { file: 'aof_lee.jpg', name: 'Lee Pai Long', gender: 'm' },
  { file: 'aof_mickey.jpg', name: 'Mickey Rogers', gender: 'm' },
  { file: 'aof_mrbig.jpg', name: 'Mr. Big', gender: 'm' },
  { file: 'aof_mrkarate.png', name: 'Mr. Karate', gender: 'm' },
  { file: 'aof_todoh.png', name: 'Ryuhaku Todoh', gender: 'm' },
  { file: 'aof2_eiji.jpg', name: 'Eiji Kisaragi', gender: 'm' },
  { file: 'aof2_temjin.jpg', name: 'Temjin', gender: 'm' },

  { file: 'aof3_jin.jpg', name: 'Jin Fu-Ha', gender: 'm' },
  { file: 'aof3_karman.jpg', name: 'Karman Cole', gender: 'm' },
  { file: 'aof3_kasumi.jpg', name: 'Kasumi Todoh', gender: 'f' },
  { file: 'aof3_lenny.jpg', name: 'Lenny Creston', gender: 'f' },
  { file: 'aof3_rody.jpg', name: 'Rody Birts', gender: 'm' },
  { file: 'aof3_sinclair.jpg', name: 'Sinclair', gender: 'f' },
  { file: 'aof3_wang.jpg', name: 'Wang Koh-San', gender: 'm' },
  { file: 'aof3_wyler.jpg', name: 'Wyler', gender: 'm' },

  { file: 'kotm_astroguy.png', name: 'Astro Guy', gender: 'm' },
  { file: 'kotm_beetlemania.png', name: 'Beetle Mania', gender: 'm' },
  { file: 'kotm_geon.png', name: 'Geon', gender: 'm' },
  { file: 'kotm_poisonghost.png', name: 'Poison Ghost', gender: 'm' },
  { file: 'kotm_rocky.png', name: 'Rocky', gender: 'm' },
  { file: 'kotm_woo.png', name: 'Woo', gender: 'm' },

  { file: 'whp_gokuu.gif', name: 'Son Gokuu', gender: 'm' },
  { file: 'whp_neodio.jpg', name: 'Neo Dio', gender: 'm' },

  { file: 'sr_carol.jpg', name: 'Carol Stanzack', gender: 'f' },
  { file: 'sr_chung.jpg', name: 'Chung Paifu', gender: 'm' },
  { file: 'sr_eagle.jpg', name: 'Max Eagle', gender: 'm' },
  { file: 'sr_gordon.jpg', name: 'Gordon Bowman', gender: 'm' },
  { file: 'sr_gozu.jpg', name: 'Gozu', gender: 'm' },
  { file: 'sr_hayate.jpg', name: 'Sho Hayate', gender: 'm' },
  { file: 'sr_joker.jpg', name: 'Joker', gender: 'm' },
  { file: 'sr_kingleo.jpg', name: 'King Leo', gender: 'm' },
  { file: 'sr_kinglion.jpg', name: 'King Lion', gender: 'm' },
  { file: 'sr_mezu.jpg', name: 'Mezu', gender: 'm' },
  { file: 'sr_nicola.jpg', name: 'Nicola Zaza', gender: 'm' },

  { file: 'ke_jyazu.jpg', name: 'Jyazu', gender: 'm' },
  { file: 'ke_rosa.jpg', name: 'Rosa', gender: 'f' },
  { file: 'ke_sue.jpg', name: 'Kim Sue Il', gender: 'm' },

];

// { file: '', name: '', gender: 'm' },

const isValidWrongAnswer = validAnswer =>
  option => option.file !== validAnswer.file && option.gender === validAnswer.gender;

export default {

  quiz(mode) {
    const questions = [];
    _.shuffle(data).forEach((validAnswer) => {
      const options = data.filter(isValidWrongAnswer(validAnswer));
      const wrongAnswers = _(options).shuffle().take(3).value();
      questions.push({ validAnswer, wrongAnswers });
    });
    let length = 20;
    if (mode === 'normal') {
      length = parseInt(questions.length / 3, 10);
    }
    if (mode === 'hard') {
      length = parseInt(questions.length / 3, 10) * 2;
    }
    if (mode === 'extreme' || !mode) {
      length = questions.length;
    }
    return _.take(questions, length);
  },

  data,

};
