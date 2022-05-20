<template>
    <div class="simple-form">
        <h1>Registration Form</h1>
        <div class="text-inputs-wrapper">
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
                <v-select
                    v-model="language"
                    class="dropdown-select language"
                    placeholder="Language"
                    :searchable=false
                    :map-keydown="handlers"
                    :options="languages"
                    append-to-body
                    :calculate-position="withPopper"
                >
                    <template slot="selected-option" slot-scope="option">
                        <img :src="option.image" width="20px">{{ option.title }}
                    </template>
                    <template slot="option" slot-scope="option">
                        <img :src="option.image" width="20px">
                        {{option.title}}
                    </template>
                </v-select>
                <span class="error" v-if="v$.language.$errors.length">{{v$.language.$errors[0].$message}}</span>
            </div>
            <div class="wrapper">
                <v-select 
                    v-model="selectedCountry"
                    class="dropdown-select country"
                    placeholder="Country"
                    :searchable="false"
                    :map-keydown="handlers"
                    :options="countries"
                    append-to-body
                    :calculate-position="withPopper"
                />
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
import { createPopper } from '@popperjs/core'
import 'vue-popperjs/dist/vue-popper.css';
import "vue-select/dist/vue-select.css";

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
            placeholder: 'Country',
            languages: [{
                title: 'Slovak',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/1024px-Flag_of_Slovakia.svg.png',
                label: 'sk'
            },
            {
                title: 'English',
                image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1920px-Flag_of_the_United_Kingdom.svg.png',
                label: 'en'
            }],
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
        .then(response => (this.countries = response.data.map(row => row.name)));
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
        },
        withPopper(dropdownList, component, { width }) {
            dropdownList.style.width = width;
            const popper = createPopper(component.$refs.toggle, dropdownList, {
                placement: 'bottom',
                modifiers: [
                {
                    name: "offset",
                    options: {
                        offset: [0, 0]
                    }
                },
                {
                    name: "toggleClass",
                    enabled: true,
                    phase: "write",
                    fn({ state }) {
                        if (state.placement === "top") {
                            component.$el.classList.toggle("drop-up");
                        }
                        else if (state.placement === "bottom") {
                            component.$el.classList.toggle("drop-down")
                        }
                    }
                }
                ]
            });
            return () => popper.destroy()
        },
        handlers: (map, vm) => ({
            ...map,
            38: (e) => {
                e.preventDefault();
                vm.typeAheadUp();
            },
            40: (e) => {
                e.preventDefault();
                vm.typeAheadDown();
            }
        })
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import  '../styles/_checkbox.scss';
@import  '../styles/_dropdown.scss';
@import  '../styles/_textInput.scss';
@import  '../styles/_switcher.scss';

.simple-form {
    position: relative;
    margin: 122px 283px 122px;
    width: 874px;
    height: 887px;

    display: grid;
    justify-content: center;

    background-color: #fff;
    border-radius: 25px;

    & > h1 {
        margin-top: 94px;
        text-align: center;
        font-size: 60px;
        line-height: 78.12px;
    }
}

.text-inputs-wrapper {
    display: grid;
    justify-content: center;
    grid-template-columns: 318px 318px;
    grid-template-rows: 64px 64px 64px 64px;
    column-gap: 20px;
    row-gap: 26px;
    margin: 58px 106px 0px;

    & > .wrapper:first-of-type {
        grid-column: 1 / 3;

        & > .text-input {
            width: 662px;
        }
    }

    .language {
        z-index: 3;
    }

    .country {
        z-index: 2;
    }
}

.private-wrapper {
    margin: 20px 106px 0px;
    padding-bottom: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid #F2F4F6;
    font-size: 14px;
}

.sign-up-wrapper {
    display: flex;
    margin: 20px 106px 140px;
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
}

@media screen and (max-width: 890px) {
    .simple-form {
        width: 335px;
        height: 951px;
        padding: 25px 20px 25px;
        margin: 20px 20px 160px;

        & > h1 {
            margin-top: 25px;
            font-size: 30px;
            line-height: 39px;
            letter-spacing: -0.02em;
        }
    }

    .text-inputs-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 20px;
        margin: 29px 20px 21px;

        .wrapper {
            display: flex;
            flex-direction: column;
        }

        & > .wrapper:first-of-type {
            & > .text-input {
                width: 295px;
            }
        }

        .text-input,
        .dropdown-select {
            width: 295px;
            margin: 0px;
        }
    }

    .private-wrapper {
        width: 295px;
        justify-self: center;
        margin: 0px 20px 0px; 
    }

    .sign-up-wrapper {
        flex-direction: column;
        align-items: center;
        justify-content: center;

        :first-child {
            order: 2;
        }

        :nth-child(2) {
            order: 1;
        }

        & > button {
            width: 295px;
            margin: 30px 20px 0px;
        }
    }
}
</style>