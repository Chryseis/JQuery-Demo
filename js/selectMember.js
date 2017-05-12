/**
 * Created by AllenFeng on 2017/5/10.
 */
(function ($) {
    $.fn.selectMember = function (teamArray,members) {
        var self = this,
            members =members instanceof Array ?members:[];
            selectTmpl = '{{#members}}<div class="tag"><span>{{value}}</span><i class="handle icon-glyph-167" data-code="{{code}}"></i></div>{{/members}}',
            teamTmpl = '<ul class="team-container">{{#team}}<li class="team"><i class="toggle icon-glyph-166"></i><input class="team-check" type="checkbox" data-code="{{teamId}}" data-value="{{team}}"/><span>{{team}}</span>\
           <ul class="member-container">{{#members}}\
        <li class="member"><input class="member-check" data-code="{{name}}" data-value="{{trueName}}"type="checkbox"/><span>{{trueName}}</span>\
      </li> {{/members}}</ul>\
      </li>{{/team}}</ul>';

        var selectTemplate = Handlebars.compile(selectTmpl);
        var teamTemplate = Handlebars.compile(teamTmpl);

        self.append('<div class="select-input clearfix"></div>');
        self.append(teamTemplate({team: teamArray}));

        function _checkRender() {
            $('.select-input').html(selectTemplate({members:members}));
            $('.team-container input').prop('checked',false);
            members.map(function (item) {
                $('.team-container input[data-code="' + item.code + '"]').prop('checked',true);
            });
            $.each($('.team'),function (index,item) {
                var checked=true;
                var children=$(item).find('.member-check');
                $.each(children,function (index,child) {
                    if(!$(child).prop('checked')){
                        checked=false
                    }
                })
                $(item).find('.team-check').prop('checked',checked);
            })
        }

        //default values render
        members&&members.length>0&&_checkRender();

        //delete member
        self.on('click', '.handle', function (e) {
            e.stopPropagation();
            var code = $(this).data('code');
            $(this).parent().remove();
            // $('input[data-code="' + code + '"]').prop('checked', false);
            // $('input[data-code="' + code + '"]').parents('.team').find('.team-check').prop('checked', false)
            _.remove(members, function (item) {
                return item.code == code;
            })
            _checkRender();
        })

        //toggle event
        self.on('click', '.toggle', function () {
            if ($(this).hasClass('icon-glyph-166')) {
                $(this).removeClass('icon-glyph-166').addClass('icon-glyph-165').siblings('.member-container').show();
            } else {
                $(this).removeClass('icon-glyph-165').addClass('icon-glyph-166').siblings('.member-container').hide();
            }
        })

        //team check event
        self.on('click', '.team-check', function (e) {
            e.stopPropagation();
            var $check = $(this);
            var children = $check.parent().find('.member-check');
            if ($check.prop('checked')) {
                $.each(children, function (index, item) {
                    var i=_.findIndex(members,function (item) {
                        return item.code==$(item).data('code')
                    })
                    i<0&&members.push({code: $(item).data('code'), value: $(item).data('value')})
                })
            } else {
                $.each(children, function (index, item) {
                    _.remove(members, function (itemChild) {
                        return itemChild.code == $(item).data('code');
                    })
                })
            }
            _checkRender();
        })

        //member check event
        self.on('click', '.member-check', function (e) {
            e.stopPropagation();
            var $check = $(this);
            if ($check.prop('checked')) {
                var i=_.findIndex(members,function (item) {
                    return item.code==$check.data('code')
                })
                i<0&&members.push({code: $check.data('code'), value: $check.data('value')});
            } else {
                _.remove(members, function (item) {
                    return item.code == $check.data('code');
                })
            }
            _checkRender();
        })

        self.on('click', '.select-input', function () {
            $('.team-container').show();
        })

        $('body').on('click', function (e) {
            if (!$.contains(self.get(0), e.target)) {
                $('.team-container').hide();
            }
        })
    }
})(jQuery)