import decode from 'jwt-decode';
import Axios from 'axios';
export default class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://localhost:3000' 
        this.fetch = this.fetch.bind(this) 
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(email, password) {
        return Axios.post(`${this.domain}/api/login`, {
            email: email,
            password: password
        }).then(res => {
            this.setToken(res.data.token);
            return Promise.resolve(res);
        })
    }

    register(name, email, password) {
        return Axios.post(`${this.domain}/api/register`, {
            name: name,
            email: email,
            password: password
        }).then(res => {
            this.setToken(res.data.token)
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        const token = this.getToken() 
        return !!token && !this.isTokenExpired(token) 
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        return localStorage.getItem('id_token')
    }

    logout() {
        localStorage.removeItem('id_token');
    }

    getProfile() {
        return decode(this.getToken());
    }


    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) { 
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}