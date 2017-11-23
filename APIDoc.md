auth:

    auth/login/  (普通用户登录，用于移动端)  &   auth/admin-login/  (管理员登录，仅用于PC端)
        POST
            params:
                username: 用户名
                password: 密码
            return:
                ret: 1为成功，0为失败
                data: 状态描述


    auth/register/  (用户注册)
        POST
            params:
                username: 用户名
                password1: 输入密码
                password2: 再次输入密码
            returns:
                ret: 1为成功，0为失败
                data: 状态描述


    auth/reset/  (重置密码)
        POST
            params:
                username:
                password1:
                password2:
            returns:
                ret: 1为成功，0为失败
                data: 状态描述


    auth/logout/  (退出登录)
        GET
            params:
            returns:
                ret: 1为成功，0为失败
                data: 状态描述


robot:  除host_list禁用外，其余均无变化

    robot/getqrcode/
    robot/host_list/   ## 禁用
    robot/is_login/
    robot/is_uuid_login/
    robot/define_sign_rule/
    robot/add_super_user/
    robot/reset_heart_beat/
    robot/reset_single/


user:

    user/info/  (用户信息，商铺信息)(需登录状态)
        GET
            params:
            returns:
                ret: 1为成功，0为失败
                data: 用户信息dict。
                    {"username" : string(帐号,手机号),
                    "shop_name" : string(店铺名),
                    "trust" : Boolean (托管状态)
                    }

        POST (修改托管状态)
            params:
                trust: Boolean(托管状态) , 若未传入，默认为True
            returns:
                ret : 1
                data : "修改成功"


    user/get-chatroom/  (获取所有群)(需登录状态)
        GET
            params:
            returns:
                data: 群信息json
                    [
                        {
                            "ret" : 1 / 0 (登录状态，1为在线，0为不在线)
                            "name" : string (微信昵称)
                            "group": list (群信息)
                                [
                                    {
                                        'nickname' : 群名，用于展示
                                        'username' : 群标识，用于添加或删除操作
                                    }
                                ]
                        }
                    ]


    user/chatroom-is-send/  (获取所有发单群)(修改是否发单)(需登录状态)
        GET (获取所有发单群)
            params:
            returns:
                data: 群信息json
                    [
                        {
                            "ret" : 1 / 0 (登录状态，1为在线，0为不在线)
                            "name" : string (微信昵称)
                            "group": list (群信息)
                                [
                                    {
                                        'nickname' : 群名，用于展示
                                        'username' : 群标识，用于添加或删除操作
                                    }
                                ]
                        }
                ]

        POST  (修改是否发单)
            param:
                action : 修改动作，0为删减，1为添加
                cr_username_list : 要修改的群标识列表 (单个操作也得是列表)
                    [
                        "username1","username2",....
                    ]
            returns:
                ret : 1
                data : "添加/移除成功"


product:

    product/edit/  (编辑商品推广图文)(需要登录状态及管理员权限，应只在PC端访问)
        POST
            params:
                product_id : 商品id
                broadcast_text : 推广文案，以'\n'拼接的多条文字。
                broadcast_img : 推广图片，以'\n'拼接的多条url。
            returns:
                data : update success (200)
                data : Admin only (403)

    product/info/  (商品详情)
        GET
            params:
            returns:
                data : 所有商品详情组成的列表，每个商品为一个字典
                    [
                        {
                            'ad_image': 主图url,
                            'name' : 商品名称,
                            'subtitle' :商品副标题,
                            'org_price' : 商品原价,
                            'sale_price' : 商品活动价,
                            'product_id' : 商品id
                            ...(目前仅用到以上字段，完整字段请查看文末附录)
                        }
                        ...
                    ]


    product/push-by-shop/  (商家推送商品)(需登录状态)
        GET
            params:
                product_id : 商品id
            returns:
                data : success

        product/push-by-admin/  (商家推送商品)(需登录状态)(需管理员权限，应仅在PC端开放)
            GET
                params:
                    product_id : 商品id
                returns:
                    data : success (200)
                    data : Admin only (403)

        product/push-shop/  (商家推送自己商店的链接)(需登录状态)
            GET
                params:
                returns:
                    data : success






附录：
    商品的全部字段.
        data_dict['ad_image']                  ## 商品主图
        data_dict['activity_id']                 ## 活动id
        data_dict['activity_name']         ## 活动名称
        data_dict['product_id']               ## 商品id
        data_dict['name']                           ## 商品名称
        data_dict['subtitle']                      ## 商品副标题
        data_dict['desc']                             ## 商品描述
        data_dict['serial_image']           ## 商品详图，以多个图片url以"\n"拼接组成的字符串
        data_dict['org_price']                  ## 商品原价
        data_dict['sale_price']                 ## 商品活动价
        data_dict['mut_values']              ## 商品净含量
        data_dict['start_time']                ## 活动开始时间
        data_dict['end_time']                  ## 活动结束时间
        data_dict['presale_delivery_time'] ## 提货时间
        data_dict['sale_quant']               ## 销量
        data_dict['presale_quant']       ## 限量
        data_dict['vendor_id']                 ## 供应商id
        data_dict['vendor_name']        ## 供应商名称
        data_dict['vendor_short']         ## 供应商简称
        data_dict['attention_number'] ## 关注人数
        data_dict['share_name']             ## 分享标题
        data_dict['share_desc']                ## 分享副标题
        data_dict['broadcast_text']                ## 推广文案，多条以'\n'拼接
        data_dict['broadcast_img']                ## 推广图片，多个url以'\n'拼接
