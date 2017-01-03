/**
 * Created by AllenFeng on 2016/12/8.
 */
function selectArea() {

}

selectArea.prototype = {
    loadData: function (selector,data) {
        function load() {
            var defalutArea = {
                "province": "", "city": "", "subdistrict": ""
            }

            data=$.extend(defalutArea,data);

            //加载地区
            $.ajax({
                type: 'get',
                dataType: "json",
                url: './source/Citys.json',
                success: function (res) {
                    $(selector+' .province').html($('#tmpl').tmpl(res))//省份

                    //添加默认项
                    if(data.province!=''){
                        $(selector+' .province [data-code="'+data.province+'"]').addClass('active');
                        var city = _.find(res, {"code": data.province});
                        city&&$(selector+' .citys').html($('#tmpl').tmpl(city.cell));
                        if(data.city!=''){
                            $(selector+' .citys [data-code="'+data.city+'"]').addClass('active');
                            var subdistrict = _.find(city.cell, {"code": data.city});
                            subdistrict&&$(selector+' .subdistrict').html($('#tmpl').tmpl(subdistrict.cell));

                            if(data.subdistrict!=''){
                                $(selector+' .subdistrict [data-code="'+data.subdistrict+'"]').addClass('active');
                            }
                        }
                    }

                    //选择省份
                    $(selector+' .province').off('click').on('click', 'a', function () {
                        //香港 澳门 台湾特殊处理
                        if ($(this).attr('data-code') == '710000' || $(this).attr('data-code') == '810000' || $(this).attr('data-code') == '820000') {
                            $(this).addClass('active').siblings().removeClass('active');
                            $(selector+' input:first').val($(selector+' .province .active').html());
                            $(selector+' .citys a').remove();
                            $(selector+' .subdistrict a').remove();
                            $(selector+' .area-container').addClass('hide');
                            $(selector+' [type="hidden"]').val($(this).attr('data-code'));
                        } else {
                            $(selector+' .citys a',selector+' .subdistrict a').remove();
                            $(this).addClass('active').siblings().removeClass('active');
                            var city = _.find(res, {"code": $(this).attr('data-code')});
                            $(selector+' .citys').html($('#tmpl').tmpl(city.cell));
                            $(selector+' .area-citys').addClass('active').siblings('li').removeClass('active');
                            $(selector+' .citys').removeClass('hide').siblings('.container').addClass('hide');
                            $(selector+' input:first').val($(selector+' .province .active').html());

                            //选择城市
                            $(selector+' .citys').off('click').on('click', 'a', function () {
                                $(this).addClass('active').siblings().removeClass('active');
                                var subdistrict = _.find(city.cell, {"code": $(this).attr('data-code')});
                                $(selector+' .subdistrict').html($('#tmpl').tmpl(subdistrict.cell));
                                $(selector+' .area-subdistrict').addClass('active').siblings('li').removeClass('active');
                                $(selector+' .subdistrict').removeClass('hide').siblings('.container').addClass('hide');
                                $(selector+' input:first').val($(selector+' .province .active').html() + '/' + $(selector+' .citys .active').html());

                                //选择区县
                                $(selector+' .subdistrict').off('click').on('click', 'a', function () {
                                    $(this).addClass('active').siblings().removeClass('active');
                                    $(selector+' input:first').val($(selector+' .province .active').html() + '/' + $(selector+' .citys .active').html() + '/' + $(selector+' .subdistrict .active').html());
                                    $(selector+' .area-container').addClass('hide');
                                    $(selector+' [type="hidden"]').val($(this).attr('data-code'));
                                })
                            })
                        }
                    });
                }
            })

            //tab显示
            $(selector+' .area-tools').off('click').on('click', 'li', function () {
                $(this).addClass('active').siblings().removeClass('active');
                if ($(this).hasClass('area-province')) {
                    $(selector+' .province').removeClass('hide').siblings('.container').addClass('hide');
                } else if ($(this).hasClass('area-citys')) {
                    $(selector+' .citys').removeClass('hide').siblings('.container').addClass('hide');
                } else {
                    $(selector+' .subdistrict').removeClass('hide').siblings('.container').addClass('hide');
                }
            })

            $(selector+' .city').focus(function (e) {   
                e.preventDefault();
                $(selector+' .area-container').removeClass('hide')
            })

            $('body').on('click', function (e) {
                if (!$.contains($(selector).get(0), e.target)) {
                    $(selector+' .area-container').addClass('hide')
                }
            })
        }
        return load();
    }
}