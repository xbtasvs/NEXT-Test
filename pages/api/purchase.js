// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { addTest, checkTest, getTests } = require('../../db/index')
let color1 = 0, color2 = 0, color3 = 0;
let price1 = 0, price2 = 0, price3 = 0, price4 = 0, n = 0;

const purchase = async (req, res) => {
  switch (req.method) {
    case 'GET':
      //...
      res.status(200).json({ tests: await getTests() })
      break
    case 'POST':
      //...
      const check = await checkTest(req.body)
      if (check) {
        return res.status(422).json({ result: 'Already Exist' })
      }
      let color, price;

      let array = []
      if (color1 === 0) {
        array.push(1)
      }
      if (color2 === 0) {
        array.push(2)
      }
      if (color3 === 0) {
        array.push(3)
      }
      let col = Math.floor(Math.random() * 100) % array.length
      if (array[col] === 1) {
        color = '#FF0000'
        color1 = 1
      } else if (array[col] === 2) {
        color = '#00FF00'
        color2 = 1
      } else if (array[col] === 3) {
        color = '#0000FF'
        color3 = 1
      }
      if (color1 === 1 && color2 === 1 && color3 === 1) {
        color1 = 0
        color2 = 0
        color3 = 0
      }

      array = []
      ++n;
      if (price1 * 100 < 75 * n) {
        array.push(1)
      }
      if (price2 * 100 < 10 * n) {
        array.push(2)
      }
      if (price3 * 100 < 5 * n) {
        array.push(3)
      }
      if (price4 * 100 < 10 * n) {
        array.push(4)
      }

      let prc = Math.floor(Math.random() * 100) % array.length
      if (array[prc] === 1) {
        ++price1
        price = 10
      } else if (array[prc] === 2) {
        ++price2
        price = 20
      } else if (array[prc] === 3) {
        ++price3
        price = 50
      } else if (array[prc] === 4) {
        ++price4
        price = 5
      }

      if (n === 20) {
        n = 0
        price1 = 0
        price2 = 0
        price3 = 0
        price4 = 0
      }

      const dbres = await addTest({ id: req.body.id, color, price: price })

      res.status(200).json({ id: req.body.id, color, price: price })
      // res.status(200).json({ result: 'Success' })
      break
    default:
      res.status(405).end() //Method Not Allowed
      break
  }
}

export default purchase