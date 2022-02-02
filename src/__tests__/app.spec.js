import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex from "vuex"
import App from "@/App";

function mountComponent() {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    return shallowMount(App, {
        localVue,
        mocks: {
            $store: {
                state: {
                    count: 6
                },
                getters: {
                    getCount: 6
                }
            }
        }
    })
}

describe('App.vue', () => {
    let wrapper
    let h1Element
    let notificationArea
    beforeEach(() => {
        wrapper = mountComponent()
        h1Element = wrapper.find("h1")
        notificationArea = wrapper.find(".notificationArea")
    })
    test('should component exist', () => {
        expect(wrapper.exists()).toBeTruthy()
    })
    test('should h1 exist', () => {
        expect(h1Element.exists()).toBeTruthy()
    })
    test('should h1 element text equals to `Daily Corona Cases in Turkey`', () => {
        expect(h1Element.text()).toBe('Daily Corona Cases in Turkey')
    })
    test('should notificationArea class associate with correct `getCount` value', () => {
        const test = {
            message: "Life is normal. Case count is 6k",
            class: "normal"
        }

        expect(notificationArea.text()).toBe(test.message)
        expect(notificationArea.classes()).toContain(test.class)
    })
})