/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.

 */

export const USE_PROXY = false;

export const APP = {

    BUTTONS: {
        OK: "Ok"
    },

    ERRORS: {
        BLFIELDS: "You have not filled some field!!!!!"
    },

    IP: {
        BASE: USE_PROXY ? 'cald/' : "http://10.171.11.100:8090/cald/",
        ACCOUNT: {
            LOGIN: "login",
            LOGOUT: "logout/"   //logout/token
        },
        RESTAURANT: {
            BASE: "restaurant/",
            INFORMATION: {
                BYCITY: "/information/city/",
                SINGLE: "/information/"
            },
            BOOKING: "/booking",    //{token}/booking
            DELETE: "/delete/",
            INSERT: "/insert",
            UPDATE: "/update"
        },

        CINEMA: {
            BASE: "cinema/",
            INFORMATION: {
                BYCITY: "/information/city/",
                SINGLE: "/information/"
            }
        },

        PARALLEL: {
            BASE: "night/",
            INFORMATION: "/information/city/"
        }

    },

    MESSAGES: {
        DELETED: "Deleted OK",
        BOOKING: "Booking OK"
    },

    NAME: "EnjoyReservation",

    STATUSCODE: {

        SC200: "Request ok",
        SC201: "Creation ok",
        SC404: "Not found",
        SC500: "Server error"

    },

    STORAGE_KEYS: {
        TOKEN: "token",
        ID_USER: "id_user"
    }

}

