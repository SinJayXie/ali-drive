interface RefreshTokenResponse {
    default_sbox_drive_id?: string,
    role?: string,
    device_id?: string,
    user_name?: string,
    need_link?: boolean,
    expire_time?: string,
    pin_setup?: boolean,
    need_rp_verify?: boolean,
    avatar?: string,
    user_data?: {
        DingDingRobotUrl?: string,
        EncourageDesc?: string,
        FeedBackSwitch?: boolean,
        FollowingDesc?: string,
        ding_ding_robot_url?: string,
        encourage_desc?: string,
        feed_back_switch?: boolean,
        following_desc?: string
    },
    token_type?: string,
    access_token?: string,
    default_drive_id?: string,
    domain_id?: string,
    refresh_token?: string,
    is_first_login?: boolean,
    user_id?: string,
    nick_name?: string,
    exist_link?: any[],
    state?: string,
    expires_in?: number,
    status?: string
}

interface AliUserInfo {
    domain_id?: string,
    user_id?: string,
    avatar?: string,
    created_at?: number,
    updated_at?: number,
    email?: string,
    nick_name?: string,
    phone?: string,
    phone_region?: string,
    role?: string,
    status?: string,
    user_name?: string,
    description?: string,
    default_drive_id?: string,
    user_data?: Record<any, any>,
    deny_change_password_by_self?: boolean,
    need_change_password_next_login?: boolean,
    creator?: string,
    expired_at?: number,
    permission?: null,
    default_location?: string,
    last_login_time?: number
}

interface AliFileItem {
    drive_id: string,
    domain_id: string,
    file_id: string,
    name: string,
    type: string,
    content_type: string,
    created_at: string,
    updated_at: string,
    file_extension: string,
    mime_type: string,
    mime_extension: string,
    hidden: boolean,
    size: number,
    starred: boolean,
    status: string,
    user_meta: string,
    upload_id: string,
    parent_file_id: string,
    crc64_hash: string,
    content_hash: string,
    content_hash_name: string,
    download_url: string,
    url: string,
    category: string,
    encrypt_mode: string,
    punish_flag: number,
    creator_type: string,
    creator_id: string,
    last_modifier_type: string,
    last_modifier_id: string,
    revision_id: string,
    revision_version: number
}