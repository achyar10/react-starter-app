import { useState, useEffect } from 'react'
import {
   CButton,
   CCard,
   CCardBody,
   CCardGroup,
   CCol,
   CContainer,
   CForm,
   CFormInput,
   CRow,
} from '@coreui/react'
import Logo from '../../../assets/brand/logo.svg'
import axios from 'axios'
import { commonUtil } from '../../../utils'


const Login = (props: any) => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [loading, setLoading] = useState(false)
   const [textLoading, setTextLoading] = useState('Login')

   useEffect(() => {
      if (localStorage.getItem('authJwt')) {
         props.history.push('/')
      }
   }, [props])

   const handleSubmit = async (e: any) => {
      e.preventDefault()
      if (username === '') return commonUtil.showAllert('Username tidak boleh kosong!')
      if (password === '') return commonUtil.showAllert('Password tidak boleh kosong!')
      setLoading(true)
      setTextLoading('Loading...')
      axios.post('api/auth/login', { phone: username, password })
         .then(rs => {
            localStorage.setItem('authJwt', rs.data.data.access_token)
            props.history.push('/')
         })
         .catch(err => {
            commonUtil.showAllert(err.response.data.message || err.message)
         })
      setLoading(false)
      setTextLoading('Login')
   }

   return (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
         <CContainer>
            <CRow className="justify-content-center">
               <CCol md={5}>
                  <CCardGroup>
                     <CCard className="p-4 not-rounded">
                        <CCardBody>
                           <CForm onSubmit={handleSubmit}>
                              <div className="text-center">
                                 <img src={Logo} height={'50'} alt="logo" />
                                 <span className="text-dark">React Starter App</span>
                              </div>
                              <h3>Sign In</h3>
                              <p className="text-medium-emphasis">Your account</p>
                              <div className="mb-3">
                                 <CFormInput className="not-rounded" type="text" id="username" placeholder="Username" autoComplete="off" autoFocus onChange={e => setUsername(e.target.value)} />
                              </div>
                              <div className="mb-3">
                                 <CFormInput className="not-rounded" type="password" id="password" placeholder="Password" autoComplete="off" onChange={e => setPassword(e.target.value)} />
                              </div>
                              <CRow>
                                 <CCol xs={12}>
                                    <div className="d-grid gap-2">
                                       <CButton disabled={loading} color="success" className="not-rounded text-white px-4" type="submit">
                                          {textLoading}
                                       </CButton>
                                    </div>
                                 </CCol>
                              </CRow>
                           </CForm>
                        </CCardBody>
                     </CCard>
                  </CCardGroup>
               </CCol>
            </CRow>
         </CContainer>
      </div>
   )
}

export default Login
