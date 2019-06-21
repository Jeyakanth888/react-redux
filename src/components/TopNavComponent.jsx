import React from 'react';
class TopNav extends React.Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Redux-React</a>
                        </div>
                        <ul className="nav navbar-nav top-nav">
                            <li className="active"><a href="#">Home</a></li>
                            <li><a href="#">Newletter</a></li>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Specials</a></li>
                            <li><a href="#">Blogs</a></li>
                        </ul>
                    </div>
                </nav>
            </header>

        )
    }
}
export default TopNav;
