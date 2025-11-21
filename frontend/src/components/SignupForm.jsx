import { useState } from "react";
import axios from "axios";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "", email: "", address: "", password: ""
  });
  const [msg, setMsg] = useState("");
  const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Processing...");
    try {
      await axios.post(`${API}/users/signup`, formData);
      setMsg("✅ Signup successful! You can now log in.");
    } catch (err) {
      setMsg(err.response?.data?.message ? `❌ ${err.response.data.message}` : "❌ Signup failed");
    }
  };

  return (
    <div className="app-container" style={{display:"flex", justifyContent:"center"}}>
      <div className="card" style={{maxWidth:520, width:"100%"}}>
        <h2 className="h1">Create account</h2>
        <p className="form-note">Enter your details to get started</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field"><label>Full name</label><input className="input" name="name" value={formData.name} onChange={handleChange} required/></div>
          <div className="field"><label>Email</label><input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required/></div>
          <div className="field"><label>Address</label><textarea className="textarea" name="address" value={formData.address} onChange={handleChange}></textarea></div>
          <div className="field"><label>Password</label><input className="input" type="password" name="password" value={formData.password} onChange={handleChange} required/></div>

          <div style={{display:"flex", gap:12}}>
            <button className="btn" type="submit">Sign up</button>
            <button type="button" className="btn ghost" onClick={()=>setFormData({name:"",email:"",address:"",password:""})}>Clear</button>
          </div>

          {msg && <p style={{marginTop:12}} className="form-note">{msg}</p>}
        </form>
      </div>
    </div>
  );
}
