module.exports = global.sessionConfig = {
  isLogin: false,
  lang: "id",
  userdata: {
    username: null,
    apikey: null,
    role: null,
  },
  branchid: null,
  formatData: {
    date: "DD/MM/YYYY",
    number: {
      split  : 3, //setiap berapa digit untuk di split dengan koma mulai dari yang sebelah kanan
    },
    money: {
      prefix: "Rp. ",
      decimal: 2 //setiap berapa digit untuk ditambahkan di belakang koma
    },
  },
  darktheme: false,
  tenant: {
    id: null,
    logo: null,
  },
};
