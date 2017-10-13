<div id="screeningConditionsDiv" class="new_search_box" style="display: none">
    <div class="sl-key">已选条件：</div>
    <div class="clear_check_big_box">
        <div class="clear_check_box">
            <ul class="clear_check_state" id="screeningConditions"></ul>
        </div>
        <div class="clear_check" >清空已选条件</div>
    </div>
</div>
<div id="brand_div" class="new_search_box search_brand_on clearfix" style="display: block;">
    <div class="sl-key">品牌：</div>
    <ul class="dl-cat-list">

        {% for v in brands.data %}
        {% if loop.index<23 %}
        <li data-id="{{v.brandId}}" title="{{v.brandName}}">
            <a href="javascript:void(0)">
                {{v.brandName}}
            </a>
        </li>
        {% endif %}
        {% endfor %}
    </ul>
    <div id="brandMoreButton" class="clear_check_cat">更多∨</div>
    <div id="brandMoreSelectFirst" class="clear_check_cat2">+多选</div>
    <div class="cl"></div>
</div>

<div id="brand_more_div" class="new_search_box search_brand_off more_select_list">
    <div class="sl-key">品牌：</div>
    <div class="sl-all" ></div>
    <input type="hidden" id="categoryCodesForBrand" value="C01L0101">
    <ul id="letterList" class="letter-list clearfix">
        <li><a href="javascript:void(0)">A</a></li>
        <li><a href="javascript:void(0)">B</a></li>
        <li><a href="javascript:void(0)">C</a></li>
        <li><a href="javascript:void(0)">D</a></li>
        <li><a href="javascript:void(0)">E</a></li>
        <li><a href="javascript:void(0)">F</a></li>
        <li><a href="javascript:void(0)">G</a></li>
        <li><a href="javascript:void(0)">H</a></li>
        <li><a href="javascript:void(0)">I</a></li>
        <li><a href="javascript:void(0)">J</a></li>
        <li><a href="javascript:void(0)">K</a></li>
        <li><a href="javascript:void(0)">L</a></li>
        <li><a href="javascript:void(0)">M</a></li>
        <li><a href="javascript:void(0)">N</a></li>
        <li><a href="javascript:void(0)">O</a></li>
        <li><a href="javascript:void(0)">P</a></li>
        <li><a href="javascript:void(0)">Q</a></li>
        <li><a href="javascript:void(0)">R</a></li>
        <li><a href="javascript:void(0)">S</a></li>
        <li><a href="javascript:void(0)">T</a></li>
        <li><a href="javascript:void(0)">U</a></li>
        <li><a href="javascript:void(0)">V</a></li>
        <li><a href="javascript:void(0)">W</a></li>
        <li><a href="javascript:void(0)">X</a></li>
        <li><a href="javascript:void(0)">Y</a></li>
        <li><a href="javascript:void(0)">Z</a></li>
    </ul>
    <div class="search-condition">
        &nbsp;&nbsp;&nbsp;
        <input type="text" id="brandNameValue"  value="">
        <a href="javascript:void(0)" id="searchCon" >&nbsp;搜索</a>
    </div>
    <div id="brandSlideUp" class="clear_check_cat">收起∧</div>
    <div id="brandMoreSelect" class="clear_check_cat2">+多选</div>
    <input type="hidden" id="brandSelectFlag" value="moreFlag">
    <div class="cl clearfix"></div>
    <div>
        <ul id="brandUl" class="brand_list clearfix" style="height: 143px;">
            {% for v in brands.data %}
            <li data-id="{{v.brandId}}" id="{{v.brandId}}"  class="sl-none" title="{{v.brandName}}">
                <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                <a href="javascript:void(0)" title="{{v.brandName}}">
                    {{v.brandName}}
                </a>
            </li>
            {% endfor %}

        </ul>
    </div>
    <div id="selectedBrandShow" class="selected-brand clearfix" >
        <div class="check-key">已选品牌(5个以内)：</div>
        <ul id="brandAdd" class="clearfix"></ul>
    </div>
    <div id="brand_buttonShow_div" class="brand_buttonShow_div">
        <span id="brandConfirm" class="check-button">确定</span>
        <span id="brandConfirmSelected" class="selected-check-button">确定</span>
        <span id="brandCancel" class="clear-button">取消</span>
    </div>
    <div class="cl"></div>
</div>