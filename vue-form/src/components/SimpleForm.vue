<template>
    <div class="simple-form">
        <h1>Registration Form</h1>
        <div class="text-inputs">
            <input id="email" v-model="email" class="text-input" type="email" placeholder="Email" />
            <input id="first-name" v-model="firstName" class="text-input" placeholder="First name" />
            <input id="last-name" v-model="lastName" class="text-input" placeholder="Last name" />
            <select name="language" v-model="language" id="language" class="select-input" placeholder="Language">
                <option value="sk">Slovak</option>
                <option value="en">English</option>
            </select>
            <select name="country" v-model="selectedCountry" id="country" class="select-input" placeholder="Country">
                <option v-for="(country, idx) in countries" :value="country" :key="idx">{{country.name}}</option>
            </select>
            <input id="password" v-model="password" class="text-input" placeholder="Password" />
            <input id="confirm_password" v-model="confirmPassword" class="text-input" placeholder="Confirm password" disabled/>
        </div>
        <div class="private-wrapper">
            <label for="private"><b>Private Profile</b></label>
            <label class="switcher">
                <input type="checkbox" v-model="checkPrivate">
                <span class="slider round"></span>
                <span v-if="checkPrivate" class="slider-yes">YES</span>
                <span v-if="!checkPrivate" class="slider-no">NO</span>
            </label>
        </div>
        <div class="sign-up-wrapper">
            <button id="submit"><b>Sign up</b></button>
            <label class="checkbox-container">Creating an account means you're okay with our Privacy Policy
                <input type="checkbox">
                <span class="checkmark"></span>
            </label>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "SimpleForm",
    data() {
        return {
            email: '',
            firstName: '',
            lastName: '',
            language: '',
            countries: [],
            selectedCountry: '',
            password: '',
            confirmPassword: '',
            checkPrivate: false
        }
    },
    mounted() {
        axios
        .get('https://restcountries.com/v2/all?fields=name')
        .then(response => (this.countries = response.data));
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.simple-form {
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    display: grid;
    justify-content: center;
    padding: 60px;
    background-color: #fff;
    border-radius: 20px;

    & > h1 {
        text-align: center;
    }
}

.text-inputs {
    display: grid;
    justify-content: center;
    grid-template-columns: 0.5fr 0.5fr;
    grid-template-rows: 60px 60px 60px 60px;

    .select-input {
        margin: 10px 0px;
        height: 40px;
        padding: 10px;
        border-radius: 10px;
        background-color: #F6F8FA;
        position: relative;

        .select-input select {
            background-color: #F6F8FA;
        }
    }

    .text-input {
        margin: 10px 0px;
        background-color: #F6F8FA;
        border-radius: 10px;
        height: 30px;
        border: none;
        padding: 10px;
        padding-left: 13px;
        border: 1px solid #f2f5f8;

        &:valid {
            color: #1b2c45;
        }

        &:invalid {
            color: #f43c3c;
        }

        &::placeholder {
            color: #76879e;
        }

        &:first-of-type {
            grid-column: 1 / 3;
        }

        &:nth-child(even) {
            margin-right: 20px;
        }
    }

    .text-input:hover {
        border: 1px solid #d5dbe2;
    }

    .text-input:focus {
        outline: 0;
        border-width: 0 0 1px;
        border-color: #004eef;

        &::before {
            content: "value";
            color: red
        }
    }

    .text-input:disabled {
        outline: 0;

        &:hover {
            border-width: 0px;
            outline: 0;
        }
    }
}

.private-wrapper {
    margin: 20px 0px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #F2F4F6;

    .switcher {
        position: relative;
        display: inline-block;
        width: 80px;
        height: 34px;

        & > input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        & > span {
            color: #a6b1c1;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #f2f5f8;
            -webkit-transition: .4s;
            transition: .4s;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
        }

        .slider-yes {
            color: #fff;
            position: absolute;
            font-size: 16px;
            left: 8px;
            top: 8px;
        }

        .slider-no {
            color: #76879e;
            position: absolute;
            font-size: 16px;
            right: 8px;
            top: 8px;
        }

        input:checked + .slider {
            background-color: #004eef;
        }

        input:focus + .slider {
            box-shadow: 0 0 1px #004eef;
        }

        input:checked + .slider:before {
            -webkit-transform: translateX(46px);
            -ms-transform: translateX(46px);
            transform: translateX(46px);
        }

        .slider.round {
            border-radius: 34px
        }

        .slider.round:before {
            border-radius: 50%;
        }
    }
}

.sign-up-wrapper {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    align-items: center;

    & > button {
        background: linear-gradient(to right, #8600ef, #034cef);
        color: white;
        width: 350px;
        border-radius: 10px;
        border: none;
        padding: 15px;
        margin-right: 50px;

        &:hover {
            cursor: pointer;
            background: linear-gradient(to left, #8600ef, #034cef);
        }
    }

    .checkbox-container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-left: 15px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }
        
        .checkmark {
            color: #31425a;
            position: absolute;
            top: 0;
            left: 0;
            height: 25px;
            width: 25px;
            background-color: #f6f8fa;
            border-radius: 6px;
            text-align: left;
        }

        /* Create the checkmark/indicator (hidden when not checked) */
        .checkmark:after {
            content: "";
            position: absolute;
            display: none;
        }
    }

    /* On mouse-over, add a grey background color */
    .checkbox-container:hover input ~ .checkmark {
        border: 1px solid #d5dbe2;
    }

    /* When the checkbox is checked, add a blue background */
    .checkbox-container input:checked ~ .checkmark {
        background-color: #004eef;
    }

    /* Show the checkmark when checked */
    .checkbox-container input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .checkbox-container .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
}
</style>
