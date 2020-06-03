import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import { isContext } from 'vm';
// STANDARD_SERVERR = 'http://54.95.141.59/quiz/'
var URL = 'https://nmdap.udn.com.tw/test/quiz/'
// var URL = 'https://54.95.141.59/quiz/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: true,
    sumOfPlayers: 0,
    sumOfStars: 0,
    lastPage: 0,
    currentPage: 0,
    currentAnswer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    lastTotalScore: 10,
    totalScore: 10,
    totalStars: 3,
    allStars: [0, 0, 0, 0, 0],
    isFold: [false, false, false, false, false, false, false, false, false, false],
    allScores: [{number: 0, option_yes: 0, option_no: 0}, {number: 0, option_yes: 0, option_no: 0}, {number: 0, option_yes: 0, option_no: 0}, {number: 0, option_yes: 0, option_no: 0}, {number: 0, option_yes: 0, option_no: 0},
                {number: 0, option_yes: 0, option_no: 0}, {number: 0, option_yes: 0, option_no: 0}, {number: 0, option_yes: 0, option_no: 0}, {number: 0, option_yes: 0, option_no: 0}, {number: 0, option_yes: 0, option_no: 0}]
  },
  getters: {
    judgeResult: function (state) {
      return { 'stars': state.totalStars, 'number': state.totalScore }
    },
    getSumOfPlayers: function (state) {
      return state.sumOfPlayers
    },
    getSumOfStars: function (state) {
      return state.sumOfStars
    },
    getCurrentAnswer: function (state) {
      return state.currentAnswer
    },
    getCurrentPage: function (state) {
      return state.currentPage
    },
    getLastScore: function (state) {
      return state.lastTotalScore
    },
    getAllScores: function (state) {
      return state.allScores
    },
    getOneScore(state) {
      return (index) => {
        return state.allScores[index]
      }
    },
    getAllStars: function (state) {
      return state.allStars
    },
    getLastPage: function (state) {
      return state.lastPage
    },
    getIsFolder: function (state) {
      return state.isFold
    }
  },
  mutations: {
    changePage (state, pageNumber) {
      state.lastPage = state.currentPage
      state.currentPage = pageNumber
    },
    resetScore (state) {
      let defaultValue = {
        totalScore: 10,
        totalStars: 3,
        scores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
      state.currentAnswer = defaultValue.scores.slice()
      state.totalScore = 10
      state.totalStars = 3
    },
    recordScore (state, score) {
      Vue.set(state.currentAnswer, score.whichQuestion, score.newScore)
    },
    recordStar (state) {
      let starNumber = state.totalStars
      let url = URL + 'savestar'
      let data = {
          starNumber: starNumber
      };
      state.allStars[starNumber - 1] += 1
      console.log(typeof(starNumber))
      axios.put(url, data)
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    recordOption (state, option) {
      let url = URL + 'savescore'
      let data = {
          question: (option.whichQuestion + 1),
          option: 1
      };
      if (option.newOption === 'value1') {
        data.option = 1
      } else if (option.newOption === 'value2') {
        data.option = -1
      } else {
        console.log("something wrong in recordOption")
      }
      axios.put(url, data)
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    examinationResult (state) {
      let reducer = (accumulator, currentValue) => accumulator + currentValue;
      // 只能做一次
      state.lastTotalScore = state.totalScore
      state.totalScore = state.currentAnswer.reduce(reducer, 10)
      if ( 0 <= state.totalScore && state.totalScore <= 3 ) {
        state.totalStars = 5
      } else if ( 4 <= state.totalScore && state.totalScore <= 7 ) {
        state.totalStars = 4
      } else if ( 8 <= state.totalScore && state.totalScore <= 12 ) {
        state.totalStars = 3
      } else if ( 13 <= state.totalScore && state.totalScore <= 16 ) {
        state.totalStars = 2
      } else if ( 17 <= state.totalScore && state.totalScore <= 20 ) {
        state.totalStars = 1
      } else {
        console.log("something wrong in examinationResult!")
      }
    },
    addSumOfPlayers (state) {
      axios.put(URL + 'total')
      .then(res=>{
        state.sumOfPlayers = res.data
      })
      .catch(err=>{
        console.log(err)
      })
      
      // state.totalPlayerNmuber =
    },
    addSumOfStars (state) {
      let url = URL + 'total_star'
      axios.put(url)
      .then(res=>{
        state.sumOfStars = res.data
      })
      .catch(err=>{
        console.log(err)
      })
    },
    initAllScores (state, scores) {
      state.allScores.map((item, index)=>{
        item.number = scores[index].number
        item.option_yes = scores[index].option_yes
        item.option_no = scores[index].option_no
      })
    },
    initAllStars (state) {
      
      let url = URL + 'stargroup'
      let url_total = URL + 'total_star'
      axios
        .all([axios.get(url), axios.get(url_total)])
        .then(axios.spread((res1, res2)=>{
          let source1 = res1.data
          let source2 = res2.data
          Object.keys(source1).map((item)=>{
            state.allStars[item] = source1[item].number
          })
          state.sumOfStars = source2
        }))
        .catch(err=>{
          console.log(err)
        })     
    },
    foldCurrentCard (state, whichCard) {
      Vue.set(state.isFold, whichCard.number, whichCard.judge)
    },
    foldAllCards (state) {
      let reset = [false, false, false, false, false, false, false, false, false, false]
      state.isFold = reset.slice()
    }
  },
  actions: {
    changePage (context, pageNumber) {
      context.commit('changePage', pageNumber)
    },
    resetScore (context) {
      context.commit('resetScore')
    },
    recordScore (context, score) {
      context.commit('recordScore', score)
    },
    recordOption (context, option) {
      context.commit('recordOption', option)
    },
    examinationResult (context) {
      context.commit('examinationResult')
    },
    addSumOfPlayers (context) {
      context.commit('addSumOfPlayers')
    },
    addSumOfStars (context) {
      context.commit('addSumOfStars')
    },
    recordStar (context) {
      context.commit('recordStar')
    },
    initAllScores (context, scores) {
      context.commit('initAllScores', scores)
    },
    initAllStars (context, scores) {
      context.commit('initAllStars', scores)
    },
    foldCurrentCard (context, whichCard) {
      context.commit('foldCurrentCard', whichCard)
    },
    foldAllCards (context) {
      context.commit('foldAllCards')
    }
  }
})
