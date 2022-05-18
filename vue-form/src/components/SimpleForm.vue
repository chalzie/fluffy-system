<template>
    <div class="simple-form">
        <h1>Registration Form</h1>
        <div class="text-inputs">
            <div class="wrapper">
                <input id="email" v-model="email" class="text-input" type="email" placeholder="Email" />
                <span class="error" v-if="v$.email.$errors.length">{{v$.email.$errors[0].$message}}</span>
            </div>
            <div class="wrapper">
                <input id="first-name" v-model="firstName" class="text-input" placeholder="First name" />
                <span class="error" v-if="v$.firstName.$errors.length">{{v$.firstName.$errors[0].$message}}</span>
            </div>
            <div class="wrapper">
                <input id="last-name" v-model="lastName" class="text-input" placeholder="Last name" />
                <span class="error" v-if="v$.lastName.$errors.length">{{v$.lastName.$errors[0].$message}}</span>
            </div>
            <div class="wrapper">
                <select name="language" v-model="language" id="language" class="select-input" placeholder="Language">
                    <option value="" disabled selected>Language</option>
                    <option value="sk"><img src="../assets/sk.svg"> Slovak</option>
                    <option value="en"><img src="../assets/en.svg"> English</option>
                </select>
                <span class="error" v-if="v$.language.$errors.length">{{v$.language.$errors[0].$message}}</span>
            </div>
            <div class="wrapper">
                <select name="country" v-model="selectedCountry" id="country" class="select-input" placeholder="Country">
                    <option value="" disabled selected>Country</option>
                    <option v-for="(country, idx) in countries" :value="country.name" :key="idx">{{country.name}}</option>
                </select>
                <span class="error" v-if="v$.selectedCountry.$errors.length">{{v$.selectedCountry.$errors[0].$message}}</span>
            </div>
            <div class="wrapper">
                <input id="password" v-model="password" class="text-input" placeholder="Password" type="password" />
                <span class="error" v-if="v$.password.$errors.length">{{v$.password.$errors[0].$message}}</span>
            </div>
            <div class="wrapper">
                <input id="confirm_password" v-model="confirmPassword" class="text-input" placeholder="Confirm password" type="password" />
                <span class="error" v-if="v$.confirmPassword.$errors.length">{{v$.confirmPassword.$errors[0].$message}}</span>
            </div>
        </div>
        <div class="private-wrapper">
            <label for="private"><b>Private Profile</b></label>
            <label class="switcher">
                <input type="checkbox" v-model="checkPrivate">
                <span class="slider round"></span>
                <span v-if="checkPrivate" class="slider-text yes">YES</span>
                <span v-if="!checkPrivate" class="slider-text no">NO</span>
            </label>
        </div>
        <div class="sign-up-wrapper">
            <button id="submit" @click.prevent="submit"><b>Sign up</b></button>
            <label class="checkbox-container">Creating an account means you're okay with our Privacy Policy
                <input type="checkbox">
                <span class="checkmark"></span>
            </label>
        </div>
        <Modal :showModal="showModal" />
    </div>
</template>

<script>
import axios from 'axios';
import Modal from './Modal';
import { email, required, minLength, sameAs } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
    name: "SimpleForm",
    components: {
        Modal,
    },
    setup: () => ({ v$: useVuelidate() }),
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
            checkPrivate: false,
            showModal: false
        }
    },
    validations() {
        return {
            email: { required, email },
            firstName: { required },
            lastName: { required },
            language: { required },
            selectedCountry: { required },
            password: { required, minLength: minLength(8) },
            confirmPassword: { required, minLength: minLength(8), sameAsPassword: sameAs(this.password) }
        }
    },
    mounted() {
        axios
        .get('https://restcountries.com/v2/all?fields=name')
        .then(response => (this.countries = response.data));
    },
    methods: {
        async submit () {
            const result = await this.v$.$validate()
            if (!result) {
                console.log('invalid form');
                return
            }
            else {
                console.log('valid form');
                this.showModal = true;
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
    border-radius: 25px;

    & > h1 {
        text-align: center;
        line-height: 78.12px;
    }
}

.wrapper {
    display: flex;
    flex-direction: column;

    &:first-of-type {
        grid-column: 1 / 3;
    }
}

.select-input {
    position: relative;
    background-color: #F6F8FA;
    color: #76879e;
    height: 44px;
    border-radius: 14px;
    padding: 10px 10px 10px;
    border: none;

    display: grid;
    grid-template-areas: "select";

    appearance: none;
    width: 100%;
    // TODO: selectboxes with popper.js

    &::-ms-expand {
        display: none;
    }
}

.select-input::after {
  content: "";
  width: 0.8em;
  height: 0.5em;
  background-color: grey;
  clip-path: polygon(100% 0%, 0 0%, 50% 100%);
}

.text-inputs {
    display: grid;
    justify-content: center;
    grid-template-columns: 0.5fr 0.5fr;
    grid-template-rows: 70px 70px 70px 70px;

    :nth-child(even) {
        margin-right: 20px;
    }

    .text-input {
        background-color: #F6F8FA;
        border-radius: 14px;
        height: 44px;
        border: none;
        padding: 10px;
        padding-left: 18px;
        border: 1px solid #f2f5f8;
        transition: all 0.4s;

        &:valid {
            color: #1b2c45;
        }

        &:invalid {
            color: #f43c3c;
        }

        &::placeholder {
            color: #76879e;
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

    .error {
        transition: visibility 0.4s;
        color: red;
        font-size: 12px;
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
        cursor: pointer;
        width: 60px;
        height: 30px;

        & > input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        & > span {
            color: #a6b1c1;
            font-size: 11px;
        }

        .slider {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #f2f5f8;
            -webkit-transition: all .4s;
            transition: all .4s;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 24px;
            width: 19px;
            left: 4px;
            bottom: 3px;
            background-color: white;
            -webkit-transition: all .4s;
            transition: all .4s;
        }

        .slider-text {
            position: absolute;
            top: 1px;
            height: 28px;
            line-height: 27.81px;
            transition: visibility .4s;

            &.yes {
                color: #fff;
                left: 11px;
            }

            &.no {
                color: #76879e;
                right: 11px;
            }
        }

        input:checked + .slider {
            background-color: #004eef;
        }

        input:focus + .slider {
            box-shadow: 0 0 1px #004eef;
        }

        input:checked + .slider:before {
            -webkit-transform: translateX(34px);
            -ms-transform: translateX(34px);
            transform: translateX(34px);
        }

        .slider.round {
            border-radius: 10px;
        }

        .slider.round:before {
            border-radius: 7px;
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
        line-height: 170.3%;

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

@media screen and (max-width: 700px) {

}
</style>
