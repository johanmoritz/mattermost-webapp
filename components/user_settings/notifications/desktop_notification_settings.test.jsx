// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {shallow} from 'enzyme';

import {NotificationLevels} from 'utils/constants';

import DesktopNotificationSettings from 'components/user_settings/notifications/desktop_notification_settings';

jest.mock('utils/utils.jsx', () => {
    const original = require.requireActual('utils/utils.jsx');
    return {
        ...original,
        hasSoundOptions: jest.fn(() => true),
    };
});

describe('components/user_settings/notifications/DesktopNotificationSettings', () => {
    function emptyFunction() {} //eslint-disable-line no-empty-function

    const baseProps = {
        activity: NotificationLevels.MENTION,
        sound: 'false',
        updateSection: emptyFunction,
        setParentState: emptyFunction,
        submit: emptyFunction,
        cancel: emptyFunction,
        error: '',
        active: true,
        saving: false,
        focused: false,
    };

    /*
    * Creates a ShallowWrapper object that contains a DesktopNotificationSetting object. By 
    * doing this, we are able to check that the maximum settings matches the snapshot.
    */
    test('should match snapshot, on max setting', () => {
        const wrapper = shallow(
            <DesktopNotificationSettings {...baseProps}/>
        );

        expect(wrapper).toMatchSnapshot();
    });

    /*
    * Creates a ShallowWrapper object that contains a DesktopNotificationSetting object. By 
    * doing this, we are able to check that the minimum settings matches the snapshot.
    */
    test('should match snapshot, on min setting', () => {
        const props = {...baseProps, active: false};
        const wrapper = shallow(
            <DesktopNotificationSettings {...props}/>
        );

        expect(wrapper).toMatchSnapshot();
    });

    /*
    * Creates a ShallowWrapper object that contains a DesktopNotificationSetting object. By 
    * doing this, we are able to call its handleMinUpdateSection function which in turn should 
    * call the updateSection function and cancel function passed down by the props. We then use 
    * toHaveBeenCalledTimes and toHaveBeenCalledWith to check that it in fact was called (the 
    * right amount of times and with the right args).
    */
    test('should call props.updateSection and props.cancel on handleMinUpdateSection', () => {
        const props = {...baseProps, updateSection: jest.fn(), cancel: jest.fn()};
        const wrapper = shallow(
            <DesktopNotificationSettings {...props}/>
        );

        wrapper.instance().handleMinUpdateSection('');
        expect(props.updateSection).toHaveBeenCalledTimes(1);
        expect(props.updateSection).toHaveBeenCalledWith('');
        expect(props.cancel).toHaveBeenCalledTimes(1);
        expect(props.cancel).toHaveBeenCalledWith();

        wrapper.instance().handleMinUpdateSection('desktop');
        expect(props.updateSection).toHaveBeenCalledTimes(2);
        expect(props.updateSection).toHaveBeenCalledWith('desktop');
        expect(props.cancel).toHaveBeenCalledTimes(2);
        expect(props.cancel).toHaveBeenCalledWith();
    });

    /*
    * Creates a ShallowWrapper object that contains a DesktopNotificationSetting object. By 
    * doing this, we are able to call its handleMaxUpdateSection function which in turn should 
    * call the updateSection function passed down by the props. We then use toHaveBeenCalledTimes 
    * and toHaveBeenCalledWith to check that updateSection in fact was called (the right amount 
    * of times and with the right args).
    */
    test('should call props.updateSection on handleMaxUpdateSection', () => {
        const props = {...baseProps, updateSection: jest.fn()};
        const wrapper = shallow(
            <DesktopNotificationSettings {...props}/>
        );

        wrapper.instance().handleMaxUpdateSection('');
        expect(props.updateSection).toHaveBeenCalledTimes(1);
        expect(props.updateSection).toHaveBeenCalledWith('');

        wrapper.instance().handleMaxUpdateSection('desktop');
        expect(props.updateSection).toHaveBeenCalledTimes(2);
        expect(props.updateSection).toHaveBeenCalledWith('desktop');
    });

    /*
    * Creates a ShallowWrapper object that contains a DesktopNotificationSetting object. By 
    * doing this, we are able to call its handleOnChange function which in turn should create
    * a change event, handleOnChange then call setParentState which is passed down by props.
    * We then use toHaveBeenCalledTimes and toHaveBeenCalledWith to check that setParentState in 
    * fact was called (the right amount of times and with the right args).
    */
    test('should call props.setParentState on handleOnChange', () => {
        const props = {...baseProps, setParentState: jest.fn()};
        const wrapper = shallow(
            <DesktopNotificationSettings {...props}/>
        );

        wrapper.instance().handleOnChange({
            currentTarget: {getAttribute: (key) => {
                return {'data-key': 'dataKey', 'data-value': 'dataValue'}[key];
            }},
        });

        expect(props.setParentState).toHaveBeenCalledTimes(1);
        expect(props.setParentState).toHaveBeenCalledWith('dataKey', 'dataValue');
    });

    /*
    * Creates a ShallowWrapper object that contains a DesktopNotificationSetting object. By 
    * doing this, we are able to call its buildMaximizedSetting function which in turn should 
    * call activity which is passed down by props. We then use toMatchSnapshot to check that 
    * the snapshot matches.
    */
    test('should match snapshot, on buildMaximizedSetting', () => {
        const wrapper = shallow(
            <DesktopNotificationSettings {...baseProps}/>
        );

        expect(wrapper.instance().buildMaximizedSetting()).toMatchSnapshot();

        wrapper.setProps({activity: NotificationLevels.NONE});
        expect(wrapper.instance().buildMaximizedSetting()).toMatchSnapshot();
    });

    /*
    * Creates a ShallowWrapper object that contains a DesktopNotificationSetting object. By 
    * doing this, we are able to call its buildMinimizedSetting function which in turn should 
    * call activity which is passed down by props. We then use toMatchSnapshot to check that 
    * the snapshot matches.
    */
    test('should match snapshot, on buildMinimizedSetting', () => {
        const wrapper = shallow(
            <DesktopNotificationSettings {...baseProps}/>
        );

        expect(wrapper.instance().buildMinimizedSetting()).toMatchSnapshot();

        wrapper.setProps({activity: NotificationLevels.NONE});
        expect(wrapper.instance().buildMinimizedSetting()).toMatchSnapshot();
    });
});
