import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

function Manager() {
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const ref = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        let password = localStorage.getItem("passwords");
        if (password) {
            setpasswordArray(JSON.parse(password))
        }
    }, [])



    const showPassword = (params) => {

        if (ref.current.src.includes("icons/closeeye.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "icons/closeeye.png"
            passwordRef.current.type = "password"
        }

    }

    const savePassword = () => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>3 ){

            setpasswordArray([...passwordArray, {...form,id:uuidv4()}])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]))
            console.log(...passwordArray, form);
            toast("Password saved!!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            toast("Password not saved!!");
        }
    }
    const deletePassword = (id) => {
        console.log("Deleting password with",id)
        const c = confirm("Do you want to Delete!!")
        if(c){

            setpasswordArray(passwordArray.filter(item=>item.id!==id) )
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
            console.log(...passwordArray, form);
            toast("Deleted successfully!!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        console.log("Edit password with",id)
        const c = confirm("Do you want to Edit!!")
        if(c){

            setform(passwordArray.filter(i=>i.id===id)[0])
            setpasswordArray(passwordArray.filter(item=>item.id!==id) )
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const copyText = (text) => {
        toast("Copied To Clipboard!!!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"


            />
            {/* Same as */}
            <ToastContainer />
           


            <div className='p-2 min-h-[90vh] md:mycontainer'>

                <h1 className='text-4xl font-bold text-center'> <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>Man/&gt;</span></h1>
                <p className='text-green-900 text-center text-lg'>Your Own Password Manager</p>
                <div className=' flex flex-col p-4 text-black gap-8 items-center'>
                    <input id='site' value={form.site} onChange={handleChange} name='site' placeholder='Enter Website URL' className=' text-black rounded-full border border-green-700 w-full py-1 px-4' type="text" />
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <input id='username' value={form.username} name='username' onChange={handleChange} placeholder='Enter Username' className='text-black rounded-full border border-green-700 w-full py-1 px-4' type="text" />
                        <div className='relative'>
                            <input id='password' ref={passwordRef} value={form.password} name='password' onChange={handleChange} placeholder='Enter Password' className=' text-black rounded-full border border-green-700 w-full py-1 px-4' type="password" />
                            <span className='absolute top-[3px] right-[5px] text-black cursor-pointer ' onClick={showPassword}>
                                <img ref={ref} className='p-1 ' width={30} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center text-xl font-bold gap-2 items-center hover:bg-green-500 bg-green-600 w-fit rounded-full py-2 px-8 border-2 border-green-900'><lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover"
                    >
                    </lord-icon>Save</button>

                </div>
                <div className="passwords">
                    <h2 className='py-4 font-bold text-xl'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white '>
                            <tr>
                                <th className='py-2'>Site </th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-200'>
                            {passwordArray.map((item, index) => {

                                return <tr key={index}>
                                    <td className=' border border-white text-center'>



                                        <span className='flex gap-2 justify-center items-center'  >
                                            <a href={item.site}>

                                                {item.site}
                                            </a>
                                        
                                            <img className='w-5 cursor-pointer' onClick={() => copyText(item.site)} src="icons/copy.png" alt="" />

                                        </span>


                                    </td>
                                    <td className='py-2 p-1 border border-white text-center'>
                                        <span className='flex gap-2 justify-center items-center'>
                                            {item.username}
                                            <img onClick={() => copyText(item.username)} className='w-5 cursor-pointer' src="icons/copy.png" alt="" />
                                        </span>

                                    </td>
                                    <td className='py-2 p-1 border border-white text-center'>
                                        <span className='flex gap-2 justify-center items-center'>
                                            {item.password}
                                            <img onClick={() => copyText(item.password)} className='w-5 m-1 cursor-pointer' src="icons/copy.png" alt="" />
                                        </span>
                                    </td>
                                    <td className='py-2 p-1 border border-white text-center'>
                                    <span className='flex gap-2 justify-center items-center'>
                                            
                                            <img onClick={()=>{editPassword(item.id)}}  className='w-5 mx-1 cursor-pointer' src="icons/pencil.png" alt="" />
                                            <img onClick={()=>{deletePassword(item.id)}} className='w-5 mx-1 cursor-pointer' src="icons/bin.png" alt="" />
                                        </span>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                    }
                </div>
            </div>
            
        </>

    )
}

export default Manager