class Background{
constructor(){
this.matrix=document.getElementById("matrix");
this.network=document.getElementById("network");
this.mCtx=this.matrix.getContext("2d");
this.nCtx=this.network.getContext("2d");
this.resize();
window.addEventListener("resize",()=>this.resize());
this.chars="01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$@%";
this.fontSize=16;
this.columns=Math.floor(this.matrix.width/this.fontSize);
this.drops=Array(this.columns).fill(1);
this.nodes=Array.from({length:90},()=>({
x:Math.random()*this.network.width,
y:Math.random()*this.network.height,
vx:(Math.random()-.5)*.6,
vy:(Math.random()-.5)*.6
}));
this.animate()
}
resize(){
this.matrix.width=this.network.width=window.innerWidth;
this.matrix.height=this.network.height=window.innerHeight
}
drawMatrix(){
this.mCtx.fillStyle="rgba(1,6,13,.3)";
this.mCtx.fillRect(0,0,this.matrix.width,this.matrix.height);
this.mCtx.fillStyle="#00ffff";
this.mCtx.font=this.fontSize+"px Consolas";
this.drops.forEach((y,i)=>{
const char=this.chars[Math.floor(Math.random()*this.chars.length)];
this.mCtx.fillText(char,i*this.fontSize,y*this.fontSize);
if(y*this.fontSize>this.matrix.height&&Math.random()>.98)this.drops[i]=0;
this.drops[i]++
})
}
drawNetwork(){
this.nCtx.clearRect(0,0,this.network.width,this.network.height);
this.nodes.forEach((a,i)=>{
a.x+=a.vx;a.y+=a.vy;
if(a.x<0||a.x>this.network.width)a.vx*=-1;
if(a.y<0||a.y>this.network.height)a.vy*=-1;
this.nodes.slice(i+1).forEach(b=>{
const d=Math.hypot(a.x-b.x,a.y-b.y);
if(d<130){
this.nCtx.strokeStyle=`rgba(0,255,255,${1-d/130})`;
this.nCtx.beginPath();
this.nCtx.moveTo(a.x,a.y);
this.nCtx.lineTo(b.x,b.y);
this.nCtx.stroke()
}
})
})
}
animate(){
this.drawMatrix();
this.drawNetwork();
requestAnimationFrame(()=>this.animate())
}
}

class AuthSystem{
constructor(){
this.passwordStrength=0;
this.generatedOTP="";
this.bindEvents()
}
bindEvents(){
document.getElementById("password").addEventListener("input",()=>this.checkStrength());
document.getElementById("loginBtn").addEventListener("click",()=>this.login());
document.getElementById("otpBtn").addEventListener("click",()=>this.verifyOTP())
}
checkStrength(){
const pwd=password.value;
const bar=document.getElementById("strength-bar");
const text=document.getElementById("strength-text");
this.passwordStrength=0;
if(pwd.length>=6)this.passwordStrength++;
if(/[A-Z]/.test(pwd))this.passwordStrength++;
if(/[0-9]/.test(pwd))this.passwordStrength++;
if(/[^A-Za-z0-9]/.test(pwd))this.passwordStrength++;
if(this.passwordStrength<=1){
bar.style.width="25%";bar.style.background="red";text.textContent="Weak"
}else if(this.passwordStrength<=3){
bar.style.width="60%";bar.style.background="orange";text.textContent="Medium"
}else{
bar.style.width="100%";bar.style.background="#00ffcc";text.textContent="Strong"
}
}
login(){
const user=username.value.trim();
const status=loginStatus;
if(user.length<3||this.passwordStrength<4){
status.textContent="Access denied: Strong password required";
return
}
this.generatedOTP=Math.floor(100000+Math.random()*900000).toString();
demoOtp.textContent="OTP: "+this.generatedOTP;
loginStatus.textContent="OTP generated";
document.getElementById("login-step").classList.add("hidden");
document.getElementById("otp-step").classList.remove("hidden")
}
verifyOTP(){
if(otp.value.trim()===this.generatedOTP){
document.getElementById("otp-step").classList.add("hidden");
document.getElementById("success-step").classList.remove("hidden")
}else{
otpStatus.textContent="Invalid OTP"
}
}
}

new Background();
new AuthSystem();
