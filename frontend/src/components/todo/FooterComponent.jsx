import React, {Component} from "react";
import '../counter/Counter.css';

export default class FooterComponent extends Component{
    render() {
        return(
            <footer className="footer">
                <span className="text-muted">All rights reserved 2020</span>
            </footer>
        )
    }
}
