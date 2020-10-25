import React from 'react'
import CreatePost from"./CreatePost"

function Home() {
    return (
        <div className="home">
            <CreatePost />
            <div className="card home-card">
                <h5>Shubham</h5>
                <div className="card-image">
                    <img alt="" src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                </div>
                <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>Title</h6>
                    <p>Amazing Post</p>
                    <input type="text" placeholder="Add Comment" />
                </div>
            </div>
            <div className="card home-card">
                <h5>Shubham</h5>
                <div className="card-image">
                    <img alt="" src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                </div>
                <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>Title</h6>
                    <p>Amazing Post</p>
                    <input type="text" placeholder="Add Comment" />
                </div>
            </div>
            <div className="card home-card">
                <h5>Shubham</h5>
                <div className="card-image">
                    <img alt="" src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                </div>
                <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>Title</h6>
                    <p>Amazing Post</p>
                    <input type="text" placeholder="Add Comment" />
                </div>
            </div>
            <div className="card home-card">
                <h5>Shubham</h5>
                <div className="card-image">
                    <img alt="" src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
                </div>
                <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>Title</h6>
                    <p>Amazing Post</p>
                    <input type="text" placeholder="Add Comment" />
                </div>
            </div>
        </div>
    )
}

export default Home
