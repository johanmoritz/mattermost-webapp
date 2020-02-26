// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes, {any} from 'prop-types';
import React, {ChangeEvent} from 'react';
import {FormattedHTMLMessage, FormattedMessage} from 'react-intl';

import AutosizeTextarea from 'components/autosize_textarea';
import SettingItemMax from 'components/setting_item_max';
import {localizeMessage} from 'utils/utils';

const MESSAGE_MAX_LENGTH = 200;
type Props = {
    //autoResponderActive: PropTypes.bool.isRequired,
    autoResponderActive: boolean;
    //autoResponderMessage: PropTypes.string.isRequired,
    autoResponderMessage: string;
    //updateSection: PropTypes.func.isRequired,
    updateSection: () => void;
    //setParentState: PropTypes.func.isRequired,
    setParentState: (key: string | null, value: any) => null;
    //submit: PropTypes.func.isRequired,
    submit: () => void;
    //saving: PropTypes.bool.isRequired,
    saving: boolean;
    //error: PropTypes.string,
    error: string;

};
export default class ManageAutoResponder extends React.PureComponent<Props> {


    handleAutoResponderChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.setParentState('autoResponderActive', e.target.checked);
    };

    onMessageChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
        this.props.setParentState('autoResponderMessage', e.target.value);
    };

    render() {
        const {
            autoResponderActive,
            autoResponderMessage,
        } = this.props;

        let serverError;
        if (this.props.error) {
            serverError = <label className='has-error'>{this.props.error}</label>;
        }

        const inputs = [];

        const activeToggle = (
            <div
                id='autoResponderCheckbox'
                key='autoResponderCheckbox'
                className='checkbox'
            >
                <label>
                    <input
                        id='autoResponderActive'
                        type='checkbox'
                        checked={autoResponderActive}
                        onChange={this.handleAutoResponderChecked}
                    />
                    <FormattedMessage
                        id='user.settings.notifications.autoResponderEnabled'
                        defaultMessage='Enabled'
                    />
                </label>
            </div>
        );

        const message = (
            <div
                id='autoResponderMessage'
                key='autoResponderMessage'
            >
                <div className='pt-2'>
                    <AutosizeTextarea
                        style={{resize: 'none'}}
                        id='autoResponderMessageInput'
                        className='form-control'
                        rows='5'
                        placeholder={localizeMessage('user.settings.notifications.autoResponderPlaceholder', 'Message')}
                        value={autoResponderMessage}
                        maxLength={MESSAGE_MAX_LENGTH}
                        onChange={this.onMessageChanged}
                    />
                    {serverError}
                </div>
            </div>
        );
        inputs.push(activeToggle);
        if (autoResponderActive) {
            inputs.push(message);
        }
        inputs.push((
            <div
                key='autoResponderHint'
                className='mt-5'
            >
                <FormattedHTMLMessage
                    id='user.settings.notifications.autoResponderHint'
                    defaultMessage='Set a custom message that will be automatically sent in response to Direct Messages. Mentions in Public and Private Channels will not trigger the automated reply. Enabling Automatic Replies sets your status to Out of Office and disables email and push notifications.'
                />
            </div>
        ));

        return (
            <SettingItemMax
                title={
                    <FormattedMessage
                        id='user.settings.notifications.autoResponder'
                        defaultMessage='Automatic Direct Message Replies'
                    />
                }
                width='medium'
                shiftEnter={true}
                submit={this.props.submit}
                saving={this.props.saving}
                inputs={inputs}
                updateSection={this.props.updateSection}
            />
        );
    }
}
