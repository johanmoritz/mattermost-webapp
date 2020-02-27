// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import {mountWithIntl} from 'tests/helpers/intl-test-helper';
import ManageAutoResponder from 'components/user_settings/notifications/manage_auto_responder.jsx';

describe('components/user_settings/notifications/ManageAutoResponder', () => {
    const requiredProps = {
        autoResponderActive: false,
        autoResponderMessage: 'Hello World!',
        updateSection: jest.fn(),
        setParentState: jest.fn(),
        submit: jest.fn(),
        saving: false,
        error: '',
    };
    test('should match snapshot, default disabled', () => {
        const wrapper = mountWithIntl(<ManageAutoResponder {...requiredProps}/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('#autoResponderActive').exists()).toBe(true);
        expect(wrapper.find('#autoResponderMessage').exists()).toBe(false);
        /*
        First expect tries to match snapshot,default disable
        Second expect tries to find autoResponderActive, expected to be true due to default.
        Third: expect tries to find autoResponderMessage, expected to be false due to the default being false.
         */
    });
    test('should match snapshot, enabled', () => {
        const wrapper = mountWithIntl(
            <ManageAutoResponder
                {...requiredProps}
                autoResponderActive={true}
            />
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('#autoResponderActive').exists()).toBe(true);
        expect(wrapper.find('#autoResponderMessage').exists()).toBe(true);
        /*
        Both expect are true due to changing the autoResponderActive={true} and autoResponderMessage: 'Hello World!'.
         */
    });
    test('should pass handleChange', () => {
        const setParentState = jest.fn();
        const wrapper = mountWithIntl(
            <ManageAutoResponder
                {...requiredProps}
                autoResponderActive={true}
                setParentState={setParentState}
            />
        );
        expect(wrapper.find('#autoResponderActive').exists()).toBe(true);
        expect(wrapper.find('#autoResponderMessageInput').exists()).toBe(true);
        /*
        Sets autoResponderActive={true}, setParentState={setParentState}
        The first two expect should be true due to autoResponderActive={true}
         */
        wrapper.find('#autoResponderMessageInput').at(1).simulate('change');
        expect(setParentState).toBeCalled();
        expect(setParentState).toBeCalledWith('autoResponderMessage', 'Hello World!');
        /*
        Check if onMessageChanged is triggered by triggering change event in message
        expect 'Hello World!' as an autoResponderMessage which is the default value
         */
        wrapper.find('#autoResponderActive').simulate('change');
        expect(setParentState).toBeCalled();
        /*
        Check if handleAutoResponderChecked is run by triggering activeToggle change event
         */
    });
});
