/**
 * Created by AllenFeng on 2017/5/10.
 */
(function ($) {
    $.fn.selectMember = function (teamArray) {
        var $self = $(this),
            members = [],
            selectTmpl = '{{#members}}<div class="tag"><span>{{value}}</span><i class="handle icon-glyph-167" data-code="{{code}}"></i></div>{{/members}}',
            teamTmpl = '<ul class="team-container">{{#team}}<li class="team"><i class="toggle icon-glyph-166"></i><input class="team-check" type="checkbox" data-code="{{teamId}}" data-value="{{team}}"/><span>{{team}}</span>\
           <ul class="member-container">{{#members}}\
        <li class="member"><input class="member-check" data-code="{{name}}" data-value="{{trueName}}"type="checkbox"/><span>{{trueName}}</span>\
      </li> {{/members}}</ul>\
      </li>{{/team}}</ul>';

        var selectTemplate = Handlebars.compile(selectTmpl);
        var teamTemplate = Handlebars.compile(teamTmpl);

        $self.append('<div class="select-input clearfix"></div>');
        $self.append(teamTemplate({team: teamArray}));

        $self.on('click', '.select-input', function () {
            $('.team-container').show();
        })

        $self.on('click', '.handle', function (e) {
            e.stopPropagation();
            var code = $(this).data('code');
            $(this).parent().remove();
            $('input[data-code="' + code + '"]').prop('checked', false);
            $('input[data-code="' + code + '"]').parents('.team').find('.team-check').prop('checked', false)
            _.remove(members, function (item) {
                return item.code == code;
            })
        })

        $self.on('click', '.toggle', function () {
            if ($(this).hasClass('icon-glyph-166')) {
                $(this).removeClass('icon-glyph-166').addClass('icon-glyph-165').siblings('.member-container').show();
            } else {
                $(this).removeClass('icon-glyph-165').addClass('icon-glyph-166').siblings('.member-container').hide();
            }
        })

        $self.on('click', '.team-check', function (e) {
            e.stopPropagation();
            var $check = $(this);
            var children = $check.parent().find('.member-check');
            if ($check.prop('checked')) {
                children.prop('checked', true);
                $.each(children, function (index, item) {
                    members.push({code: $(item).data('code'), value: $(item).data('value')})
                })
            } else {
                children.prop('checked', false);
                $.each(children, function (index, item) {
                    _.remove(members, function (itemChild) {
                        return itemChild.code == $(item).data('code');
                    })
                })
            }
            //$('.select-input').html($('#selectTmpl').tmpl(members));
            $('.select-input').html(selectTemplate({members:members}));
        })

        $self.on('click', '.member-check', function (e) {
            e.stopPropagation();
            var $check = $(this);
            if ($check.prop('checked')) {
                $.each($check.parents('.member-container').find('input'), function (index, item) {
                    if (!$(item).prop('checked')) {
                        $check.parents('.team').find('.team-check').prop('checked', false);
                    } else {
                        $check.parents('.team').find('.team-check').prop('checked', true);
                    }
                })
                members.push({code: $check.data('code'), value: $check.data('value')});
            } else {
                $check.parents('.team').find('.team-check').prop('checked', false);
                _.remove(members, function (item) {
                    return item.code == $check.data('code');
                })
            }
            //$('.select-input').html($('#selectTmpl').tmpl(members));
            $('.select-input').html(selectTemplate({members:members}));
        })

        $('body').on('click', function (e) {
            if (!$.contains($self.get(0), e.target)) {
                $('.team-container').hide();
            }
        })
    }
})(jQuery)