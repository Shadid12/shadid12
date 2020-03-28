import Head from 'next/head'
import '../styles/style.sass'
import { useState } from 'react'


const products = [
  [
    {
      id: '1',
      name: 'Macchiato',
      price: 3.50,
      imgUrl: 'https://media3.s-nbcnews.com/j/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p_67dfb6820f7d3898b5486975903c2e51.fit-760w.jpg'
    },
    {
      id: '2',
      name: 'Esspresso',
      price: 2.50,
      imgUrl: 'https://coffeebros.com/wp-content/uploads/2019/04/Espresso-crema-Here%E2%80%99s-why-it%E2%80%99s-important.png'
    },
    {
      id: '3',
      name: 'Americano',
      price: 3.95,
      imgUrl: 'https://www.craftcoffeeguru.com/wp-content/uploads/2019/02/americano-9.jpg?x84304'
    },
    {
      id: '4',
      name: 'Hot Chocolate',
      price: 5.50,
      imgUrl: 'https://www.thespruceeats.com/thmb/7-cXy5t3G8u4G0546N7JfJC3lwk=/1660x1245/smart/filters:no_upscale()/homemade-hot-chocolate-15-56a8bdfe5f9b58b7d0f4bbe2.jpg'
    }
  ],
  [
    {
      id: '5',
      name: 'Americano',
      price: 3.95,
      imgUrl: 'https://www.craftcoffeeguru.com/wp-content/uploads/2019/02/americano-9.jpg?x84304'
    },
    {
      id: '6',
      name: 'Hot Chocolate',
      price: 5.50,
      imgUrl: 'https://www.thespruceeats.com/thmb/7-cXy5t3G8u4G0546N7JfJC3lwk=/1660x1245/smart/filters:no_upscale()/homemade-hot-chocolate-15-56a8bdfe5f9b58b7d0f4bbe2.jpg'
    },
    {
      id: '7',
      name: 'Americano',
      price: 3.95,
      imgUrl: 'https://www.craftcoffeeguru.com/wp-content/uploads/2019/02/americano-9.jpg?x84304'
    },
    {
      id: '8',
      name: 'Hot Chocolate',
      price: 5.50,
      imgUrl: 'https://www.thespruceeats.com/thmb/7-cXy5t3G8u4G0546N7JfJC3lwk=/1660x1245/smart/filters:no_upscale()/homemade-hot-chocolate-15-56a8bdfe5f9b58b7d0f4bbe2.jpg'
    }
  ]
]

const Home = () => {

  const [cart, setCart] = useState([])
  const [showModal, setModalVis] = useState(false)
  const [signinModal, setsigninModal] = useState(false)
  const [signupModal, setsignupModal] = useState(false)

  const addToCart = (item) => {
    setCart([...cart, item])
  }

  const openModal = () => {
    setModalVis(!showModal)
  }

  const closeSignin = () => {
    setsigninModal(!signinModal)
  }

  const openSignup = () => {
    setsigninModal(!signinModal)
    setsignupModal(!signupModal)
  }

  const removeItem = (a) => {
    var newCart = JSON.parse(JSON.stringify(cart))
    let i = newCart.findIndex((item) => item.id === a.id)
    newCart.splice(i, 1)
    setCart(newCart)
  }

  const login = () => {

  }

  const signup = () => {

  }
  
  return (
    <div className="container">
      <Head>
        <title>Hobby Coffee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="level">
      <div className="level-left">
        <div className="level-item">
          <p className="subtitle is-5">
            <strong>Hobby</strong> Coffee
          </p>
        </div>
        <div className="level-item">
          <div className="field has-addons">
            <p className="control">
              <button className="button" onClick={closeSignin}>
                Signin
              </button>
            </p>
          </div>
        </div>
      </div>
      
      <div className="level-right">
        <div className="level-item">
          <button className="subtitle is-5" onClick={openModal}>
            <strong> {cart.length} 🛒</strong>
          </button>
          <button className="subtitle is-5">
            <strong>Pay Now 💰</strong>
          </button>
        </div>
      </div>
      </nav>
      

        {products.map((product) => 
          (
            <div className="columns">
              {product.map(item => (
                <div className="column">
                  <button className="card-btn" onClick={() => {addToCart(item)}}>
                    <figure className="image is-3by2">
                      <img src={item.imgUrl} />
                    </figure>
                    <span>{item.name}</span>
                    <br />
                    <strong>🏷️${item.price}</strong>
                  </button>
                </div>
              ))}
            </div>
          )  
        )}

        {
          showModal ? (
            <div className="modal is-active">
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Items on Cart</p>
                  <button className="delete" aria-label="close" onClick={openModal}></button>
                </header>
                <section className="modal-card-body">
                  <div >
                    {cart.map(item => (
                      <li>
                        {item.name}  {item.price}
                        <button className="cart-btn" onClick={() => {
                          removeItem(item)
                        }}>🗑️</button>
                      </li>
                    ))}
                    <hr />
                    <span>Totoal: 0</span>
                  </div>
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success" onClick={openModal}>Save changes</button>
                </footer>
              </div>
            </div>
          ) : null
        }

        {
          signinModal ? (
            <div className="modal is-active">
              <div class="modal-background"></div>
              <div class="modal-card">
                <header class="modal-card-head">
                  <p class="modal-card-title">Signin</p>
                  <button class="delete" aria-label="close" onClick={closeSignin}></button>
                </header>
                <section class="modal-card-body">
                  <div >
                    <div class="field">
                      <div class="control">
                        <input class="input is-primary" type="text" placeholder="Email" />
                      </div>
                    </div>
                    <div class="field">
                      <div class="control">
                        <input class="input is-primary" type="password" placeholder="Password" />
                      </div>
                    </div>
                    <div class="field">
                      <div class="control">
                        <button class="button is-success" onClick={login}>Login</button>
                        <button class="button btn-signup" onClick={openSignup}>Register Now!!</button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          ) : null
        }

        {
          signupModal ? (
            <div className="modal is-active">
              <div class="modal-background"></div>
              <div class="modal-card">
                <header class="modal-card-head">
                  <p class="modal-card-title">Register Now!!</p>
                  <button class="delete" aria-label="close" onClick={openSignup}></button>
                </header>
                <section class="modal-card-body">
                  <div >
                    <div class="field">
                      <div class="control">
                        <input class="input is-primary" type="text" placeholder="Email" />
                      </div>
                    </div>
                    <div class="field">
                      <div class="control">
                        <input class="input is-primary" type="password" placeholder="Password" />
                      </div>
                    </div>
                    <div class="field">
                      <div class="control">
                        <input class="input is-primary" type="password" placeholder="Re Enter Password" />
                      </div>
                    </div>
                    <div class="field">
                      <div class="control">
                        <button class="button is-success" onClick={signup}>Register</button>
                        <button class="button btn-signup" onClick={openSignup}>Login</button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          ) : null
        }
    
      </div>
  )

}

export default Home
