import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    admin_separator: {
                        table: 'sys_app_module'
                        id: '0c32168884f74612bcdddc0cbc0d4e14'
                        deleted: true
                    }
                    api_v1: {
                        table: 'sys_ws_version'
                        id: '8e59277fe0d04360b5ee735247d0a6c4'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '170af3368b5649879fa9a8b5c2128032'
                    }
                    create_recipients_route: {
                        table: 'sys_ws_operation'
                        id: '0568043ff56f46859400aa23792825f9'
                    }
                    crisis_notification_api: {
                        table: 'sys_ws_definition'
                        id: '3c09714f7f904dd8b5ac8213aa199449'
                    }
                    crisis_notification_api_acl: {
                        table: 'sys_security_acl'
                        id: 'a9238915406347179002e10c4c77c0a0'
                    }
                    crisis_notification_approved: {
                        table: 'sys_script'
                        id: '026742cb034a4b7796b2fbbd43cabe35'
                    }
                    crisis_notification_create_acl: {
                        table: 'sys_security_acl'
                        id: 'e7c767a1661c4ef7ba4a7036e83c9d18'
                    }
                    crisis_notification_delete_acl: {
                        table: 'sys_security_acl'
                        id: '4c679db86016413798979454bfa1fc92'
                    }
                    crisis_notification_menu: {
                        table: 'sys_app_application'
                        id: '7d38b93c3f3b4e44b9d8fed924bd058a'
                    }
                    crisis_notification_read_acl: {
                        table: 'sys_security_acl'
                        id: 'ef0b73617115428e95d4ec31af89492b'
                    }
                    crisis_notification_set_approved_by: {
                        table: 'sys_script'
                        id: '95d9bffa47c643179ea450a894a1df7e'
                    }
                    crisis_notification_set_created_by: {
                        table: 'sys_script'
                        id: '6ab7ef08d894490589404d1724ad6ec6'
                    }
                    crisis_notification_status_change: {
                        table: 'sys_script'
                        id: '546d44ba64a74939bdf61dd76742fa6a'
                    }
                    crisis_notification_ui_page_acl: {
                        table: 'sys_security_acl'
                        id: 'd0d97ed7f7b3473393d68781195db7c6'
                    }
                    crisis_notification_write_acl: {
                        table: 'sys_security_acl'
                        id: '43e5513bdc984fa99e1b37f1779ce5be'
                    }
                    notification_approval_validation: {
                        table: 'sys_script'
                        id: '6c15bf1ac7ea4068af3dba94df3666ad'
                    }
                    notification_approved_by_field_acl: {
                        table: 'sys_security_acl'
                        id: '4f86ce1a802041c5b007e6143ac80b93'
                    }
                    notification_delivery_stats_acl: {
                        table: 'sys_security_acl'
                        id: '926eceb72f9c4364b35168386e354064'
                    }
                    notification_expiration_check: {
                        table: 'sys_script'
                        id: '477376dae6474bc6a977d739dccd6d07'
                    }
                    notification_management_module: {
                        table: 'sys_app_module'
                        id: 'bba44b95088c422c9657b4bbff823cc5'
                        deleted: true
                    }
                    notification_priority_setter: {
                        table: 'sys_script'
                        id: '1e71377294aa4222b7031a18fd76f474'
                    }
                    notification_recipient_read_acl: {
                        table: 'sys_security_acl'
                        id: 'd7a90c9e874e4f709511746a67551137'
                    }
                    notification_recipient_write_acl: {
                        table: 'sys_security_acl'
                        id: 'd30f0261a5be4eda855a593e3e1b7f10'
                    }
                    notification_template_read_acl: {
                        table: 'sys_security_acl'
                        id: '52fe479fdb6a4f068e0ee56d0c1d79d7'
                    }
                    notification_template_write_acl: {
                        table: 'sys_security_acl'
                        id: 'c4e6b6f3eefd45e085ee1281b2702765'
                    }
                    notifications_list_module: {
                        table: 'sys_app_module'
                        id: '11ba758829454427962a432af0262d65'
                        deleted: true
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '1e738d1cf4af4de0bafd3aa728ba9e47'
                    }
                    recipient_status_update: {
                        table: 'sys_script'
                        id: 'f1145d85863f4b26af6bd85cd9ac5395'
                    }
                    recipients_list_module: {
                        table: 'sys_app_module'
                        id: 'cb8ab571d777434d8073eae80c40011f'
                        deleted: true
                    }
                    scheduled_notification_processor: {
                        table: 'sys_script'
                        id: 'bd92ec17bf6b4bbd8dd13b437cbdbc66'
                    }
                    send_notification_route: {
                        table: 'sys_ws_operation'
                        id: '9fc3ea88a9854738922bd806294abeb0'
                    }
                    sent_notification_protection: {
                        table: 'sys_script'
                        id: '39f0bc2db59c44ee9a545faf06ef499f'
                    }
                    src_server_notificationBusinessLogic_js: {
                        table: 'sys_module'
                        id: '06ee19008ad74e94a35bffa116068812'
                    }
                    src_server_notificationHandlers_js: {
                        table: 'sys_module'
                        id: 'b50be2ad964c4e2f80c1eaca585f4464'
                    }
                    src_server_teamsService_js: {
                        table: 'sys_module'
                        id: '17d57907ba50444a8f69af6790daef4d'
                    }
                    src_server_workflowAutomation_js: {
                        table: 'sys_module'
                        id: '50c584a24aaa42aa81f4a36dfcf28797'
                    }
                    teams_config_list_module: {
                        table: 'sys_app_module'
                        id: '8abbb09818ef465ebdf91b2d3019e77c'
                        deleted: true
                    }
                    teams_config_read_acl: {
                        table: 'sys_security_acl'
                        id: '1dab0afec20040f78993e9aa0a1a2607'
                    }
                    teams_config_write_acl: {
                        table: 'sys_security_acl'
                        id: 'a8c8e94dd083485bb3d35ccdf096d61c'
                    }
                    teams_setup_module: {
                        table: 'sys_app_module'
                        id: '633137bf433747f3abdfbec21251327d'
                        deleted: true
                    }
                    templates_list_module: {
                        table: 'sys_app_module'
                        id: 'ffbef42b501d4a6fa444e4a81f7d3490'
                        deleted: true
                    }
                    test_teams_route: {
                        table: 'sys_ws_operation'
                        id: '10e15c93eeba49a3abf7e0d3fa91fd04'
                    }
                }
                composite: [
                    {
                        table: 'sys_dictionary'
                        id: '000212ca57f34f1eac20df6ee2fd4365'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'access_token'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '02c22550f404482e9ad414caf2b12b07'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'retry_count'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '031719d56f7e4fe19c1b7d8069b12edb'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'target_audience'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '056e9d3ab4634a25819158fa6a64e621'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivery_status'
                            value: 'bounced'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '097c29b6e51c4e068d7f018b0ce8e9a0'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'teams_user_id'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '0a063b6a95284cf8bf0f48db4e3c43e8'
                        key: {
                            endpoint: 'x_snc_crisis_notif_management.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0aa54394893445c98707951b11e4fd65'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0bb3cb5476604ffeb890bd2dcb774ede'
                        key: {
                            sys_security_acl: '43e5513bdc984fa99e1b37f1779ce5be'
                            sys_user_role: {
                                id: '37bda64da6ef43a0b41d349e603f21ad'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_creator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0e8bef480ad744be9a07240e764121e9'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivery_status'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: '1004e957d1404614a52e67cc39386be9'
                        deleted: true
                        key: {
                            name: 'x_snc_crisis_notif_management.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '10726876c899448486fb2bb7ef664364'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'notification_type'
                            value: 'maintenance'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '117b8153bdf7496c82382022b216e218'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'default_severity'
                            value: 'high'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1191521097524bdca816d7a7a68e9b54'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'requires_approval'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '121c048fc4b6491195177735d95b8f22'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1380c873eaa9497c9a64157004848f05'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivery_method'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1425b696debf4b2e9a7b625ed08aa628'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivery_method'
                            value: 'push'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '1662167a437841ae85ae541e29cfd5df'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1679864ee4924bbbbfb9c775ccef7e01'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'target_audience'
                            value: 'specific_groups'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '167e202608fb48dba24655084c93cb06'
                        key: {
                            sys_security_acl: 'c4e6b6f3eefd45e085ee1281b2702765'
                            sys_user_role: {
                                id: '21785a2a1883494cbca7909cf8ad38e1'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '17c248c2421441aeb3f753790e478dbc'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1809675ac7d44dd191dde1ce3c7619e0'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '184cb5f248c240b9870cebf6cc795e8a'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivery_status'
                            value: 'sent'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '194ae26c513548d3a834178d76fbcb9c'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivery_method'
                            value: 'teams'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '19dedf4c52114027a7f443618295d538'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivered_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1ae63e8b1678489ea4c947658efd8c86'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'actual_send_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1c29a98f6e8e45dd914a5d9ede8a09cd'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'api_endpoint'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1c9269e57c444d56a38b76346f0e639b'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'notification_type'
                            value: 'weather'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1d98bc6df74b4c00993a3f702a613951'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'message_template'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1ff69e8b04ff43eb866193a5a88d0ded'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '21785a2a1883494cbca7909cf8ad38e1'
                        key: {
                            name: 'x_snc_crisis_notif.crisis_notification_admin'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '21d9da97a7324d0292c2b980940f5ad5'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'client_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '21da40ca80f246b899eb2e17d6961b96'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'access_token'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '220feee83398429c87183d517cb011c2'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'actual_send_time'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2229f7df025646119eb27bbe25752a73'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'acknowledged'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '22ce199c6af541618fc7ef2ac3f29d85'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivery_method'
                            value: 'sms'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '23e588c8c5c74792b19e291d8a6b59b7'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'recipient_phone'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2593a5554bfe4374a64fa9194a15e805'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'tenant_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '262f6f6fa80649a799e0626230447ae3'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'target_audience'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2631844aaaaa489a8c8f022daf3f6b20'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'sent_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2708e8d7650b46e8a601315957038121'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'send_to_teams'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '27eb902d04aa4663b6dd0a4577b8dc0c'
                        key: {
                            name: 'x_snc_crisis_notif.crisis_notification_user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2a73ffbcb683401ab22e6be120218768'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'crisis_notification'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2b47d1053fc34a3e82a2edabda50ef76'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'delivery_success_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '2b63e5de09b64d4e830a7801fb16dd08'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2b72240f5fb14192a48f26f7d6ba774e'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'scheduled_send_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2bcbbe2244c34ee0902cd93827b3f38c'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '2d598080a13b402a8c130f110cc3692b'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'template_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2d59b1d022f74a77915bb149befd2fdb'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'severity'
                            value: 'high'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '2de884727003450aa2e7b9412b79da58'
                        key: {
                            sys_security_acl: '52fe479fdb6a4f068e0ee56d0c1d79d7'
                            sys_user_role: {
                                id: '37bda64da6ef43a0b41d349e603f21ad'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_creator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3183cc3ba58c4385b7f2c1603b6f43e8'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'subject_template'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '34ddaf4bae274920b6ec4f19ce9d2b74'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'tenant_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '354812ff3060440885645c2e6f42d9a8'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'email_template'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '359127c8608a4f5cb0ff471f0d2857e9'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'test_mode'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '35c241feed6b421bb2e61cf35feb1ea4'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'approved_by'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '37bda64da6ef43a0b41d349e603f21ad'
                        key: {
                            name: 'x_snc_crisis_notif.crisis_notification_creator'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '37d076e5649c4d9ab430c30bda258411'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivery_status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3a277ad07d5f4c84a3fc94e78f911c4b'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'webhook_url'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3b33bff7bc3f483fbb46dee9d257a1cb'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'target_audience'
                            value: 'specific_users'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3b9a90619c7a42679a4e76a8e35d6033'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'target_audience'
                            value: 'contractors_only'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3c1f6d303a284ebc8a0248c52bac0013'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'default_channel_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3de858103db34476ad5f6481b265eb40'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'severity'
                            value: 'low'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3f6847963f4d404aa5b23b0447e5ff55'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivery_status'
                            value: 'failed'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3f6a7e35b73b4e0baccfcb53eff51408'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'message'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '40061393e95b40fb8affe36ef652b1de'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4041c4025bc14db88cdad2d2ac4a6655'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'read_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '417b71bbf03b4797843db3f5247de3bb'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivery_method'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4298943431e4443089872b40960dc2d0'
                        key: {
                            sys_security_acl: 'd0d97ed7f7b3473393d68781195db7c6'
                            sys_user_role: {
                                id: '27eb902d04aa4663b6dd0a4577b8dc0c'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '434aa1d5540e497782ea7cf14e56943f'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'token_expires_at'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '46374bb0be0b45b3bb496f6d36d3eba3'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'severity'
                            value: 'medium'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '469218bd7472484893f1c73cf2835c6d'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'template_type'
                            value: 'emergency'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '47a57abaf0614728881e7c2e7b97f6b0'
                        key: {
                            endpoint: 'x_snc_crisis_notif_teams_setup.do'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '4a68dbd1cb8843e996445e86d645f105'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4b7e71d5e4f842169ba7119d657b123e'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'acknowledged_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4bc0d249a7e84f8e832c531192e8bf63'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivery_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4d1e42dfad574f64ae614f62c0c65b4c'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4dff62618cd74c0e8b6b4cd594e326c8'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'template_type'
                            value: 'security'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '4e6f7d9394d742459ed1f9cc402d284c'
                        key: {
                            role: {
                                id: '21785a2a1883494cbca7909cf8ad38e1'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_admin'
                                }
                            }
                            contains: {
                                id: 'ae9500173b944470939f99133df94de1'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '4f590589672d4ca9989e266e7facb509'
                        key: {
                            application_file: 'c046345cbc2c4fc0b8a6280dde763433'
                            source_artifact: 'e79c08f282894772bb278fa5d70e8f60'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '50bb6c7e60c2407e80d633506347a7ab'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivery_status'
                            value: 'read'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '51b30282f22b454d97309cd289faaadf'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '525dbd1323514b73b1f6d3b0bcdb8c68'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '528daf3275524cdfa567ee6b5e183bb9'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'severity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '545ab36f6c964e49aaac93201257de16'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'recipient_email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '54e70f43d02f4c4c85a901d2524a82ff'
                        key: {
                            sys_security_acl: '1dab0afec20040f78993e9aa0a1a2607'
                            sys_user_role: {
                                id: '21785a2a1883494cbca7909cf8ad38e1'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '558a06d2612c4322b9e7b4e041042b39'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '55c92c0e82214b8688e4ea2074c67f82'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivery_status'
                            value: 'pending'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '5994614120e24228a63d10c1be89340d'
                        key: {
                            sys_security_acl: 'ef0b73617115428e95d4ec31af89492b'
                            sys_user_role: {
                                id: '27eb902d04aa4663b6dd0a4577b8dc0c'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5a8dfbef7e0040fba13d4a13a36d2b8a'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'test_mode'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '5a9b831fe5b44edf9287a28b3b2c4fe8'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5c7f3e695fbb43788d4abe5ffc66232f'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'client_secret'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '5cd3b80202824bd5a9ded2fb6e4f30f7'
                        deleted: true
                        key: {
                            application_file: '9b14420283484c8b81533e436de0692f'
                            source_artifact: '1004e957d1404614a52e67cc39386be9'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '5da1d8edb9e945819953778bba117b7c'
                        key: {
                            name: 'x_snc_crisis_notif/____insertStyle'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5e2eb429b652483ea2056774899a60cb'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5e68935efbd4420e84052ace96cf418c'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'recipient_email'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5f8543bd56a145ebaa94aec4b84e6be2'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'message_template'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '61ba69d573d541e49b6f09f1a12cd322'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'default_severity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '65695fc1df174e18a2ad8fc5a7d81abf'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'client_secret'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '668344342dc44bdb934c75c4b9c0db56'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'target_audience'
                            value: 'all_users'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6870a71b34584ee3be40841904e6263a'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '689d1f820c034389a98a3070e5cdf49e'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6a4cc41e786249939205d46ec119961f'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'recipient_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6b455fbc56a44a4ebd583fcf5ff197fa'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6c6123e140944ffe8c6d4cb6bf916944'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'expires_on'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6ecb6bbf7e4b424284c240b715e308d7'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '6ecf756bbda04096832f7de13c5b4f6e'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivery_method'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6f80c3f7406a4f72bc2101034d8514d3'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'acknowledged_time'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '71d2fb8bddac4a7ca3646709432e5375'
                        key: {
                            sys_security_acl: 'd7a90c9e874e4f709511746a67551137'
                            sys_user_role: {
                                id: '27eb902d04aa4663b6dd0a4577b8dc0c'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '766b7c94ba07439da3de18fe02a09a27'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7883ae7cc938430b893dd65ae752382d'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'created_by'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '78bb6125ff834b8a824f32b9bfd0c610'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '79997bf5c79b4603b97cc1f93f9dd3e0'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivery_method'
                            value: 'email'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7bad33ea260e4f8c834f39d8c759d23a'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'teams_conversation_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7cb29c90d4ab4772aa13ffe91b300563'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'template_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7d29d21f899d449ca00a05f93d549835'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'requires_approval'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7d6077813fc24208a8860ab134600d4c'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'template_type'
                            value: 'weather'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7f36e026e47e49e28d154615efa117b0'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7f7b5d7c0fbb45d4a09729a98f0cbd26'
                        key: {
                            sys_security_acl: 'a8c8e94dd083485bb3d35ccdf096d61c'
                            sys_user_role: {
                                id: '21785a2a1883494cbca7909cf8ad38e1'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '800512effbb0404dbf356e299d7a2c9a'
                        deleted: true
                        key: {
                            application_file: 'c6dd9d845f8341f484fc062556e7fd1b'
                            source_artifact: '1004e957d1404614a52e67cc39386be9'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '80ddc827402f4dd48b9478e04c28d5e9'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'default_severity'
                            value: 'critical'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '843c1b2d647345a1b65d663a40c5709e'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'sms_template'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '847fdc70fa2c40f183b2a47c8b116a0c'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'notification_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8534bd5b1e574db49c8c0f8c07dd7a0a'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'recipient_user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8553acbb420349e087a1b2cdd42b59e2'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'subject_template'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '862c4e4b69a641febb3b9b4db55a23b2'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8a017000227846f98b2d7d5e397546e8'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'status'
                            value: 'pending'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8a44caad1f7347fabcd380b068525b17'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8a7a720cba1640d9a92e11920455115b'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8ae38dafae114a5c8ae08001c9079ac3'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'send_to_teams'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8c33ca072ede4dc3aaa8893dd0af4f6f'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'send_to_email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8ca61a7efbd34de2be5140e6ed5df894'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'status'
                            value: 'draft'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8e2d53d768f84c23938cddc01c844e02'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'email_template'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '8ea06ca98ae84713b12d04e165825ae1'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'default_severity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8f7e5a8feeac4aa6b3d8476515e21799'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'teams_user_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '902d12da527e4fe3b99436010335dba3'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'status'
                            value: 'completed'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '92acf722d639448da70c64eeb6b72fe7'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'crisis_notification'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '95311bd6b5d442c88fb7abd1c8240875'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'recipient_user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9551990314a946a6a27155ebf00e4872'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'failure_reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '957539c46e8d4d4f86147f772c81e452'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'default_channel_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '96ac386e0fc746d9974263b4c6c9eb98'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '96dcdc915bb54a2b91a86e5a06083dea'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'teams_message_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9822b3f7c2234d0396a1cdf145e4f814'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'recipient_phone'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '9a8fdf330dd74dda80e75fc476a1e0e6'
                        key: {
                            role: {
                                id: 'ae9500173b944470939f99133df94de1'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_manager'
                                }
                            }
                            contains: {
                                id: '37bda64da6ef43a0b41d349e603f21ad'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_creator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '9b14420283484c8b81533e436de0692f'
                        key: {
                            name: 'x_snc_crisis_notif/main'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9bd75d2ef7f04fb7a7fc8a8051209946'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'teams_channel_id'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '9df452b290a64294b3c71b2da3f7816e'
                        key: {
                            application_file: 'd064c40139fa4f9ab6cb963feb25e085'
                            source_artifact: 'e79c08f282894772bb278fa5d70e8f60'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9df5cb2534b64d16ad438b78704f8b76'
                        key: {
                            sys_security_acl: 'a9238915406347179002e10c4c77c0a0'
                            sys_user_role: {
                                id: 'ae9500173b944470939f99133df94de1'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9f253241bbc840de9dbbf46ea9c138ab'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'default_severity'
                            value: 'low'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9f42e07fdf8c44c4a1d046aa4c7d380d'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'approved_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'a0a0c05f481840d1848ce54e4332a61a'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'notification_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a5e60f2809b141f6bb5dea3231de56bc'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'client_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a9f2322ab566410bbaa73652e99d0bb3'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'failure_reason'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ae4360962d0a487bbc1ee2454ccb1008'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'acknowledged'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'ae9500173b944470939f99133df94de1'
                        key: {
                            name: 'x_snc_crisis_notif.crisis_notification_manager'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'aea9de30e1624cf1949a8d63990b783a'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'default_severity'
                            value: 'medium'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'af07b4ccc0054e94aa1057333b4134ff'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'teams_conversation_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'af9055c1129c4ab8ad00a6d5b9b82be4'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'retry_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'af9d4f93bdd94ed19e2b3440d46b45ff'
                        key: {
                            sys_security_acl: '4c679db86016413798979454bfa1fc92'
                            sys_user_role: {
                                id: 'ae9500173b944470939f99133df94de1'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b06c9679ef264c55bf04798f10cac4af'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivery_status'
                            value: 'delivered'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b429036cb9db417b810c0426ce6a4340'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'api_endpoint'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b4443883e8014979897a76b848c7eda5'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'notification_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b8677ebebdfd4cf69ef9b41aa8e3b74a'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'template_type'
                            value: 'general'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ba933bb21ba640f3ba2260af28e263b1'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'delivered_time'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bad9028e0aec47cfb35a63c7454b140d'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'subject'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bae2a8a83be44a6ea1834aaa3d2966a5'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'send_to_sms'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bc378663fc9f4d70a433054507d7471e'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'target_audience'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'beeb59ed3c314ca3a47eeed367112e9e'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'delivery_success_count'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'c046345cbc2c4fc0b8a6280dde763433'
                        key: {
                            name: 'x_snc_crisis_notif/teams-setup'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c08358a0326347a197750bc1cec029f1'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'send_to_sms'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c5c3ebc0639140dc8d7bbeebf3d194e4'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'teams_card_template'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c6cf3693bcd94c06abc52f55bb245309'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'scheduled_send_time'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'c6dd9d845f8341f484fc062556e7fd1b'
                        key: {
                            name: 'x_snc_crisis_notif/main.js.map'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c7b97cbb0747409f893a01548d2208be'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c7e42914361747139e1f3456d3efcb34'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'notification_type'
                            value: 'security'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: 'c7e5f4045b7b4fc3a434bb8146389377'
                        key: {
                            role: {
                                id: '37bda64da6ef43a0b41d349e603f21ad'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_creator'
                                }
                            }
                            contains: {
                                id: '27eb902d04aa4663b6dd0a4577b8dc0c'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ca2c16a0cefb4bf2b0b904033c27cf6f'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'sent_time'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ca33111308fe4cba8f69887164fb01cc'
                        key: {
                            sys_security_acl: 'e7c767a1661c4ef7ba4a7036e83c9d18'
                            sys_user_role: {
                                id: '37bda64da6ef43a0b41d349e603f21ad'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_creator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cdd726219ae94a2882da0a9cadcba1d4'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'sms_template'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'd064c40139fa4f9ab6cb963feb25e085'
                        key: {
                            name: 'x_snc_crisis_notif/teams-setup.js.map'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd0cc62e1042143ea9c7f7fc0427bc8bf'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'default_severity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd188577b255f47f8b8454f11717f5e46'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'title_template'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd429c83a6aa5444488575df9f8c57bd2'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'expires_on'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd4958c042908420f8c6b6c278e56cf71'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'severity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd55483ca85a14f4880603e09ec89c131'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'status'
                            value: 'sent'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd5c56b0fd3d6461b8d639e70a281e987'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'delivery_failure_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'da00397975954d0eb80bf7cb7862cae8'
                        key: {
                            name: 'x_snc_crisis_notif_notification_recipient'
                            element: 'read_time'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'da7b22d9502e43ef88105da09a6f0036'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dac43494156d4ef893a6a6070d0c36f5'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'db599b329f704a22af7255989de22c15'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'token_expires_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dc134cd60a5544c3bf637650c2083a28'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'delivery_failure_count'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dd01aadb4a0440dd8c84bad50dea239f'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'status'
                            value: 'approved'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'dd7e56350a634d9180485b894253d649'
                        deleted: true
                        key: {
                            application_file: '0a063b6a95284cf8bf0f48db4e3c43e8'
                            source_artifact: '1004e957d1404614a52e67cc39386be9'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'defca0af171944aab97997eb3c479de9'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'severity'
                            value: 'critical'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'e031c7388de445468539b144ae58a847'
                        key: {
                            sys_security_acl: 'd30f0261a5be4eda855a593e3e1b7f10'
                            sys_user_role: {
                                id: 'ae9500173b944470939f99133df94de1'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e0426a3c3fd84ebc86737f8accbaeac2'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'target_audience'
                            value: 'employees_only'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e0e42852c0f64721861fd0b465cdfebc'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'created_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e164593c163347368a08590d08379f01'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'recipient_count'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e2123bd3db9f4b8ca26d63b7dfe1fcc2'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'teams_message_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e224f456edec4b1d97b29772c53b2d41'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'teams_card_template'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'e238cfaab5824bcdb33d47c259884ef8'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e342262377824b17bb15ec7ffa62d7f2'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e5ab6f95f0334bb98cd679e826652567'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'notification_type'
                            value: 'general'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: 'e79c08f282894772bb278fa5d70e8f60'
                        key: {
                            name: 'x_snc_crisis_notif_teams_setup.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e7dbf972125947bfbe8fb754ae21fc12'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'status'
                            value: 'cancelled'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e928c6ae6c754e02b13d47890617952b'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'subject'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'eaa5eb5e00e144c88d9f942671375617'
                        key: {
                            name: 'x_snc_crisis_notif/____insertStyle.js.map'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ec3f023aa9574386a532c0a5a2400f14'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'template_type'
                            value: 'maintenance'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'f085061c147a4f5ca66554cb5397d301'
                        key: {
                            application_file: '47a57abaf0614728881e7c2e7b97f6b0'
                            source_artifact: 'e79c08f282894772bb278fa5d70e8f60'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'f3d508f87a714343901417a1cca529d6'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'severity'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f3dcdcc3007b49ce98121cede89c2d0c'
                        key: {
                            name: 'x_snc_crisis_notif_teams_config'
                            element: 'webhook_url'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f50fbc2476684ed0af7b85b34a6e1588'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'notification_type'
                            value: 'emergency'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f646a6f7ce6e46a5a3ecf35fb71d972b'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'title_template'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fa0edd71335c4ffda667a5f2b89e3481'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'teams_channel_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fbe550b9fb954faaac91f4dd8df72713'
                        key: {
                            name: 'x_snc_crisis_notif_crisis_notification'
                            element: 'send_to_email'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'fd6bb431f7004d87b287642cfb65b66a'
                        key: {
                            sys_security_acl: '4f86ce1a802041c5b007e6143ac80b93'
                            sys_user_role: {
                                id: 'ae9500173b944470939f99133df94de1'
                                key: {
                                    name: 'x_snc_crisis_notif.crisis_notification_manager'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ffa8ebb0e53740a8b8a54965a825619f'
                        key: {
                            name: 'x_snc_crisis_notif_notification_template'
                            element: 'template_type'
                            language: 'en'
                        }
                    },
                ]
            }
        }
    }
}
