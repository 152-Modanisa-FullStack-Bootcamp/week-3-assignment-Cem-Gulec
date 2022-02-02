import {createLocalVue, shallowMount} from "@vue/test-utils";
import Counter from "@/Counter";
import Vuex from "vuex"
import {state, mutations, actions} from "@/store";

function mountComponent() {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    return shallowMount(Counter, {
        localVue,
        store: new Vuex.Store({
            state,
            mutations,
            actions
        })
    })
}

describe('Counter.vue', () => {
    let wrapper
    let increaseBtn
    let decreaseBtn
    let span
    beforeEach(() => {
        wrapper = mountComponent()
        increaseBtn = wrapper.findAll("button").at(1)
        decreaseBtn = wrapper.findAll("button").at(0)
        span = wrapper.find("span")
    })
    test('should component exist', () => {
        expect(wrapper.exists()).toBeTruthy()
    })
    test('should increase button exist', () => {
        expect(increaseBtn.exists()).toBeTruthy()
    })
    test('should decrease button exist', () => {
        expect(decreaseBtn.exists()).toBeTruthy()
    })
    test('should increase button functionality correctly done', async () => {
        await increaseBtn.trigger('click')
        expect(state.count).toBe(1)
    })
    test('should decrease button functionality correctly done', async () => {
        await decreaseBtn.trigger('click')
        expect(state.count).toBe(-1)
    })
    test('should 2 increase + 1 decrease functionality correctly done', async () => {
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        expect(state.count).toBe(1)
    })
    test('should count text be visible', () => {
        expect(span.isVisible()).toBeTruthy()
    })
    test('should count text functionality be done correctly', async () => {
        await increaseBtn.trigger('click')
        expect(span.text()).toBe('1k')
    })
})
