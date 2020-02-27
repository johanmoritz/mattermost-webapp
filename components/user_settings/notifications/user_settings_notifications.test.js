// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {shallow} from 'enzyme';

import UserSettingsNotifications from './user_settings_notifications';

describe('components/user_settings/display/UserSettingsDisplay', () => {
    const user = {
        id: 'user_id',
    };

    const requiredProps = {
        user,
        updateSection: jest.fn(),
        activeSection: '',
        closeModal: jest.fn(),
        collapseModal: jest.fn(),
        actions: {
            updateMe: jest.fn(() => Promise.resolve({})),
        },
    };

    /**
     * Creates a ShallowWrapper object that contains a UserSettingsNotifications object. By doing this, we are able to
     * call its handleSubmit function which in turn should call the updateMe function passed down by the props. We then use
     * toHaveBeenCalled to check that it in fact was called.
     */
    test('should have called handleSubmit', async () => {
        const props = {...requiredProps, actions: {...requiredProps.actions}};
        const wrapper = shallow(<UserSettingsNotifications {...props}/>);

        await wrapper.instance().handleSubmit();
        expect(requiredProps.actions.updateMe).toHaveBeenCalled();
    });

    /**
     * We now change the updateMe function to resolve with a data attribute. This in turn will trigger the if-true part of the
     * relevant code which then should call the updateSection function. It is also checked that the proper arguments are sent
     * to the function, which will always be ''. If no data attribute would've been passed, that function
     * would not run.
     */
    test('should have called handleSubmit', async () => {
        const updateMe = jest.fn(() => Promise.resolve({data: true}));

        const props = {...requiredProps, actions: {...requiredProps.actions, updateMe}};
        const wrapper = shallow(<UserSettingsNotifications {...props}/>);

        await wrapper.instance().handleSubmit();
        expect(requiredProps.updateSection).toHaveBeenCalled();
        expect(requiredProps.updateSection).toHaveBeenCalledWith('');
    });

    /**
     * We want to check that the state is reset as mentioned below. handleUpdateSection is
     * supposed to set the isSaving state to false and a handleCancel function will also be called.
     * This one in turn calls the getNotificiationsStateFromProps function which will take a look at the passed
     * arguments to our user props, where we set 'desktop' to 'on', and give desktopActivity the given value
     * (which in this case is 'on'). So we check that both of these states are reset to the expected states
     * and that the dummy function sent in is actually being called, which it should be considering that
     * the true part of the if-statement should pass.
     */
    test('should reset state when handleUpdateSection is called', () => {
        const newUpdateSection = jest.fn();
        const updateArg = 'unreadChannels';
        const props = {...requiredProps, updateSection: newUpdateSection, user: {...user, notify_props: {desktop: 'on'}}};
        const wrapper = shallow(<UserSettingsNotifications {...props}/>);

        wrapper.setState({isSaving: true, desktopActivity: 'off'});
        wrapper.instance().handleUpdateSection(updateArg);

        expect(wrapper.state('isSaving')).toEqual(false);
        expect(wrapper.state('desktopActivity')).toEqual('on');
        expect(newUpdateSection).toHaveBeenCalledTimes(1);
    });
});
