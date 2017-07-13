QUnit.test('as.Bool', function (assert) {
    assert.ok(as.Bool(true) == true);
    assert.ok(as.Bool(false) == false);
    assert.ok(as.Bool('') == false);
    assert.ok(as.Bool('true') == true);
    assert.ok(as.Bool('1') == true);
    assert.ok(as.Bool(1) == true);
    assert.ok(as.Bool(undefined) == false);
    assert.ok(as.Bool(null) == false);
    assert.ok(as.Bool({ a: 'b' }.c) == false);
    assert.ok(as.Bool(true, false) == true);
    assert.ok(as.Bool(false, true) == false);
    assert.ok(as.Bool('', true) == true);
    assert.ok(as.Bool('true', false) == true);
    assert.ok(as.Bool('1', false) == true);
    assert.ok(as.Bool(1, false) == true);
    assert.ok(as.Bool(undefined, true) == true);
    assert.ok(as.Bool(null, true) == true);
    assert.ok(as.Bool({ a: 'b' }.c, true) == true);
    assert.ok(as.Bool({ a: 'b' }['c'], true) == true);
    assert.ok(as.Bool(as.String(true)) == true);
    assert.ok(as.Bool(as.String(false)) == false);
    assert.ok(as.String(as.Bool('true')) == 'true');
    assert.ok(as.String(as.Bool('false')) == 'false');
});

QUnit.test('as.String', function (assert) {
    assert.ok(as.String('fourtytwo') == 'fourtytwo');
    assert.ok(as.String('') == '');
    assert.ok(as.String(42) == '42');
    assert.ok(as.String(undefined) == '');
    assert.ok(as.String(null) == '');
    assert.ok(as.String({ a: 'b' }.c) == '');
    assert.ok(as.String('fourtytwo', 'default') == 'fourtytwo');
    assert.ok(as.String('', 'default') == '');
    assert.ok(as.String(42, 'default') == '42');
    assert.ok(as.String(undefined, 'default') == 'default');
    assert.ok(as.String(null, 'default') == 'default');
    assert.ok(as.String({ a: 'b' }.c, 'default') == 'default');
    assert.ok(as.String({ a: 'b' }['c'], 'default') == 'default');
});

QUnit.test('as.Int', function (assert) {
    assert.ok(as.Int(42) == 42);
    assert.ok(as.Int(42.1) == 42);
    assert.ok(as.Int('') == 0);
    assert.ok(as.Int('fourtytwo') == 0);
    assert.ok(as.Int('42') == 42);
    assert.ok(as.Int('42.1') == 42);
    assert.ok(as.Int(undefined) == 0);
    assert.ok(as.Int(null) == 0);
    assert.ok(as.Int({ a: 'b' }.c) == 0);
    assert.ok(as.Int(42, 41) == 42);
    assert.ok(as.Int(42.1, 41) == 42);
    assert.ok(as.Int('', 41) == 41);
    assert.ok(as.Int('fourtytwo', 41) == 41);
    assert.ok(as.Int('42', 41) == 42);
    assert.ok(as.Int('42.1', 41) == 42);
    assert.ok(as.Int(undefined, 41) == 41);
    assert.ok(as.Int(null, 41) == 41);
    assert.ok(as.Int({ a: 'b' }.c, 41) == 41);
});

QUnit.test('as.Float', function (assert) {
    assert.ok(as.Float(42) == 42);
    assert.ok(as.Float(42.1) == 42.1);
    assert.ok(as.Float('') == 0);
    assert.ok(as.Float('fourtytwo') == 0);
    assert.ok(as.Float('42') == 42);
    assert.ok(as.Float('42.1') == 42.1);
    assert.ok(as.Float(undefined) == 0);
    assert.ok(as.Float(null) == 0);
    assert.ok(as.Float({ a: 'b' }.c) == 0);
    assert.ok(as.Float(42, 3.14) == 42);
    assert.ok(as.Float(42.1, 3.14) == 42.1);
    assert.ok(as.Float('', 3.14) == 3.14);
    assert.ok(as.Float('fourtytwo', 3.14) == 3.14);
    assert.ok(as.Float('42', 3.14) == 42);
    assert.ok(as.Float('42.1', 3.14) == 42.1);
    assert.ok(as.Float(undefined, 3.14) == 3.14);
    assert.ok(as.Float(null, 3.14) == 3.14);
    assert.ok(as.Float({ a: 'b' }.c, 3.14) == 3.14);
});

QUnit.test('as.Html', function (assert) {
    assert.ok(as.Html('fourtytwo') == 'fourtytwo');
    assert.ok(as.Html('&') == '&amp;');
    assert.ok(as.Html(null, '&') == '&amp;');
    assert.ok(as.Html('') == '');
});

QUnit.test('as.Object', function (assert) {
    assert.ok(as.Object('{ "answer" : 42 }').answer == 42);
    assert.ok(as.Object(null, '{ "answer" : 42 }').answer == 42);
    assert.ok(as.Object('[ "one", "two" ]').length == 2);
    assert.ok(as.Object('true'));
    assert.ok(as.Object('42') == 42);
    assert.ok(as.Object('"fourtytwo"') == 'fourtytwo');
    assert.ok(as.Object('{', '42') == '42');
});

