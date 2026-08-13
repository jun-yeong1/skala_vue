<script setup>
import { ref } from 'vue'

// v-model Modifiers 실습용 reactive 변수 선언
const lazyText = ref('')
const NolazyText = ref('')
const age = ref('')
const Nonumber = ref('')
const userEmail = ref('')
const Notrim = ref('')
const chain = ref('')
const Nochain = ref('')
</script>

<template>
  <div class="practice-section">
    <h2>v-model 수식어 (Modifiers) 활용</h2>
    <!-- 1) .lazy 수식어 실습 -->
    <section style="margin-bottom: 20px">
      <h3>1) .lazy 수식어 (change 이벤트 시점 반영)</h3>
      <input type="text" v-model.lazy="lazyText" placeholder="입력 후 Enter 또는 포커스 변경" />
      <p>
        실시간이 아닌 확정된 값: <strong>{{ lazyText }}</strong>
      </p>
      <br />
      <p>.lazy 수식어 없을 때 비교</p>
      <input type="text" v-model="NolazyText" placeholder="입력 후 Enter 또는 포커스 변경" />
      <p>
        실시간 값: <strong>{{ NolazyText }}</strong>
      </p>
    </section>

    <!-- 2) .number 수식어 실습 -->
    <section style="margin-bottom: 20px">
      <h3>2) .number 수식어 (Number 타입 자동 형변환)</h3>
      <input type="text" v-model.number="age" placeholder="나이를 입력하세요" />
      <p>
        입력된 값: <strong>{{ age }}</strong>
      </p>
      <p>
        데이터 타입: <strong>{{ typeof age }}</strong>
      </p>
      <br />
      <p>형변환을 하지 않을 경우 숫자 입력시</p>
      <input type="text" v-model="Nonumber" placeholder="숫자 입력해보세요" />
      <p>
        입력된 값: <strong>{{ Nonumber }}</strong>
      </p>
      <p>
        데이터 타입: <strong>{{ typeof Nonumber }}</strong>
      </p>
    </section>

    <!-- 3) .trim 수식어 실습 -->
    <section>
      <h3>3) .trim 수식어 (양끝 공백 자동 제거)</h3>
      <input type="text" v-model.trim="userEmail" placeholder="앞뒤 공백을 포함해 입력해 보세요" />
      <p>
        공백 제거된 값: <strong>"{{ userEmail }}"</strong>
      </p>
      <p>
        문자열 길이: <strong>{{ userEmail.length }}</strong>
      </p>
      <br />

      <p>공백 제거를 하지 않을 경우</p>
      <input type="text" v-model="Notrim" placeholder="앞뒤 공백을 포함해 입력해 보세요" />
      <p>
        공백 제거된 값: <strong>"{{ Notrim }}"</strong>
      </p>
      <p>
        문자열 길이: <strong>{{ Notrim.length }}</strong>
      </p>
    </section>

    <!-- 4) 수식어 체이닝 (Chaining) 실습 -->
    <section>
      <h3>4) Chaining (수식어 체이닝: .trim.number)</h3>
      <p>수식어를 여러개 적용할 수 있음</p>
      <p>아래 예제는 .trim.number 수식어를 사용한 경우</p>
      <input type="text" v-model.trim.number="chain" placeholder="공백과 숫자를 섞어 입력해 보세요" />
      <p>
        처리된 값: <strong>"{{ chain }}"</strong>
      </p>
      <p>
        데이터 타입: <strong>{{ typeof chain }}</strong>
      </p>
      <br />
      <p>수식어를 적용하지 않은 경우</p>
      <input type="text" v-model="Nochain" placeholder="공백과 숫자를 섞어 입력해 보세요" />
      <p>
        처리된 값: <strong>"{{ Nochain }}"</strong>
      </p>
      <p>
        데이터 타입: <strong>{{ typeof chain }}</strong>
      </p>
    </section>
  </div>
</template>
