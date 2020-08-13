const Clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: '8f7aca018b1e412c9732b7db10aba480'
})

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => { res.json(data) })
    .catch(err => res.status(400).json('Unable to Work With API'))
}

const handleImage = (req, res, postgres) => {
  const { id } = req.body
  postgres('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
    res.json(entries[0])
    })
  .catch(err => res.status(400).json('Unable to Get Entries'))
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}