export default {
  main_color: '#28574f',
  //   main_color: '#2874f0', // OLD values
  //   main_color: 'rgb(33,150,243)',
  main_color_light_1: '#e1f5fe',
  main_color_light_0: '#f4fcff',

  main_color_alpha: a => {
    if (a) {
      return `rgba(33,150,243, ${a})`;
    }
    return `rgba(33,150,243, 1)`;
  },
  //   main_color: '#2196f3',
  dark_grey: '#757575',
  dark_grey_1: '#616161',
  dark_grey_2: '#424242',
  light_grey: '#bdbdbd',
  sec_color: `rgba(76,182,166, 1)`,

  grad_color_1: '#0095e7',
  grad_color_2: '#31bdd1',
};
