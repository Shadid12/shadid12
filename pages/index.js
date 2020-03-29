import Head from 'next/head'
import '../styles/style.sass'
import { useState, useEffect } from 'react'
import Amplify, {Auth, API} from 'aws-amplify'
import config from '../config'


Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "orders",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "products",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  }
});

const Home = () => {

  const [cart, setCart] = useState([])
  const [showModal, setModalVis] = useState(false)
  const [signinModal, setsigninModal] = useState(false)
  const [signupModal, setsignupModal] = useState(false)
  const [products, setProducts] = useState([])
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [user, setUser] = useState(null)
  const [total, setTotal] = useState(0)


  useEffect(() => {
    async function updateUser() {
      try {
        let user = await Auth.currentAuthenticatedUser()
        setUser(user)
      } catch {
        setUser(null)
      }
    }
    async function fetchData() {
      try {
        let res = await API.get('products', '/products');
        
        let all = []
        let count = Math.floor(res.Count/4)
        let remainder = res.Count % 4
        let i = 0;
        while (i < count) {
          let toPush = []
          for(let j = 1 * i * 4; j < 4 * (i + 1); j++) {
            toPush.push(res.Items[j])
          }
          all.push(toPush)
          i++
        }
        
        if(remainder > 0) {
          let toPush = []
          for(let kk = 4 * i; kk < res.Count; kk++) {
            toPush.push(res.Items[kk])
          }
          all.push(toPush);
        }
        setProducts(all)
      } catch (error) {
        console.log('error loading', error)
      }
    }
    fetchData()
    updateUser()
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item])
    setTotal(total + item.price)
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
    setTotal(total - a.price)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePass = (e) => {
    setPass(e.target.value)
  }

  const login = async (event) => {
    event.preventDefault()

    try {
      let res = await Auth.signIn(email, pass)
      setsigninModal(!signinModal)
    } catch (e) {
      alert(e.message)
    }
  }

  const signup = () => {

  }

  const handleLogout = async () => {
    await Auth.signOut()
    setUser(null)
  }

  const paynow = async () => {
    try {
      const res = await API.post("orders", "/orders", {
        body: { "price": "3.95", "products": ["shadid12","shadid1233"] }
      })
    } catch (error) {
      console.log('error', error)
    }
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
              {user ? 
                <button className="button" onClick={handleLogout}>
                  Signout
                </button>
              : 
                <button className="button" onClick={closeSignin}>
                  Signin
                </button>
              }
            </p>
          </div>
        </div>
      </div>
      
      <div className="level-right">
        <div className="level-item">
          <button className="subtitle is-5" onClick={openModal}>
            <strong> {cart.length} 🛒</strong>
          </button>
          <button className="subtitle is-5" onClick={paynow}>
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
                    <span>Totoal: {total}</span>
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
                        <input 
                          class="input is-primary" 
                          type="text" 
                          placeholder="Email" 
                          onChange={handleEmail}
                        />
                      </div>
                    </div>
                    <div class="field">
                      <div class="control">
                        <input 
                          class="input is-primary" 
                          type="password" 
                          placeholder="Password"
                          onChange={handlePass}
                        />
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
