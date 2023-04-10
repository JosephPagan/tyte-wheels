module.exports = {
    getHome: (req,res)=> {
        res.render('home.ejs')
    },
    getCreateAccount: (req, res) => {
        res.render('signUp.ejs')
    },
    getLogin: (req, res) => {
        res.render('login.ejs')
    },
    getRideSelect: (req, res) => {
        res.render('rideSelect.ejs')
    },
    getRideImage: (req, res) => {
        res.render('rideImage.ejs')
    },
    getWaiver: (req, res) => {
        res.render('waiver.ejs')
    }
}