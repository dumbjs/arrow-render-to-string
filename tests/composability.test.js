import { html } from '@arrow-js/core'
import { test } from 'uvu'
import { inlineSnapshot } from 'uvu-inline-snapshot'
import { renderToString } from '../src/index.js'

test('Render 1000 elements', async () => {
  const tables = Array.from(new Array(1000).fill(0)).map((x, ind) => ind)

  const templ = html`
    <div class="container">
      <div class="row">
        <div class="col">${() => tables.map(x => html`<p>${x}</p>`)}</div>
      </div>
    </div>
  `

  const out = renderToString(templ)

  await inlineSnapshot(
    out,
    `
    <div class="container">
      <div class="row">
        <div class="col"><p>0</p><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p><p>14</p><p>15</p><p>16</p><p>17</p><p>18</p><p>19</p><p>20</p><p>21</p><p>22</p><p>23</p><p>24</p><p>25</p><p>26</p><p>27</p><p>28</p><p>29</p><p>30</p><p>31</p><p>32</p><p>33</p><p>34</p><p>35</p><p>36</p><p>37</p><p>38</p><p>39</p><p>40</p><p>41</p><p>42</p><p>43</p><p>44</p><p>45</p><p>46</p><p>47</p><p>48</p><p>49</p><p>50</p><p>51</p><p>52</p><p>53</p><p>54</p><p>55</p><p>56</p><p>57</p><p>58</p><p>59</p><p>60</p><p>61</p><p>62</p><p>63</p><p>64</p><p>65</p><p>66</p><p>67</p><p>68</p><p>69</p><p>70</p><p>71</p><p>72</p><p>73</p><p>74</p><p>75</p><p>76</p><p>77</p><p>78</p><p>79</p><p>80</p><p>81</p><p>82</p><p>83</p><p>84</p><p>85</p><p>86</p><p>87</p><p>88</p><p>89</p><p>90</p><p>91</p><p>92</p><p>93</p><p>94</p><p>95</p><p>96</p><p>97</p><p>98</p><p>99</p><p>100</p><p>101</p><p>102</p><p>103</p><p>104</p><p>105</p><p>106</p><p>107</p><p>108</p><p>109</p><p>110</p><p>111</p><p>112</p><p>113</p><p>114</p><p>115</p><p>116</p><p>117</p><p>118</p><p>119</p><p>120</p><p>121</p><p>122</p><p>123</p><p>124</p><p>125</p><p>126</p><p>127</p><p>128</p><p>129</p><p>130</p><p>131</p><p>132</p><p>133</p><p>134</p><p>135</p><p>136</p><p>137</p><p>138</p><p>139</p><p>140</p><p>141</p><p>142</p><p>143</p><p>144</p><p>145</p><p>146</p><p>147</p><p>148</p><p>149</p><p>150</p><p>151</p><p>152</p><p>153</p><p>154</p><p>155</p><p>156</p><p>157</p><p>158</p><p>159</p><p>160</p><p>161</p><p>162</p><p>163</p><p>164</p><p>165</p><p>166</p><p>167</p><p>168</p><p>169</p><p>170</p><p>171</p><p>172</p><p>173</p><p>174</p><p>175</p><p>176</p><p>177</p><p>178</p><p>179</p><p>180</p><p>181</p><p>182</p><p>183</p><p>184</p><p>185</p><p>186</p><p>187</p><p>188</p><p>189</p><p>190</p><p>191</p><p>192</p><p>193</p><p>194</p><p>195</p><p>196</p><p>197</p><p>198</p><p>199</p><p>200</p><p>201</p><p>202</p><p>203</p><p>204</p><p>205</p><p>206</p><p>207</p><p>208</p><p>209</p><p>210</p><p>211</p><p>212</p><p>213</p><p>214</p><p>215</p><p>216</p><p>217</p><p>218</p><p>219</p><p>220</p><p>221</p><p>222</p><p>223</p><p>224</p><p>225</p><p>226</p><p>227</p><p>228</p><p>229</p><p>230</p><p>231</p><p>232</p><p>233</p><p>234</p><p>235</p><p>236</p><p>237</p><p>238</p><p>239</p><p>240</p><p>241</p><p>242</p><p>243</p><p>244</p><p>245</p><p>246</p><p>247</p><p>248</p><p>249</p><p>250</p><p>251</p><p>252</p><p>253</p><p>254</p><p>255</p><p>256</p><p>257</p><p>258</p><p>259</p><p>260</p><p>261</p><p>262</p><p>263</p><p>264</p><p>265</p><p>266</p><p>267</p><p>268</p><p>269</p><p>270</p><p>271</p><p>272</p><p>273</p><p>274</p><p>275</p><p>276</p><p>277</p><p>278</p><p>279</p><p>280</p><p>281</p><p>282</p><p>283</p><p>284</p><p>285</p><p>286</p><p>287</p><p>288</p><p>289</p><p>290</p><p>291</p><p>292</p><p>293</p><p>294</p><p>295</p><p>296</p><p>297</p><p>298</p><p>299</p><p>300</p><p>301</p><p>302</p><p>303</p><p>304</p><p>305</p><p>306</p><p>307</p><p>308</p><p>309</p><p>310</p><p>311</p><p>312</p><p>313</p><p>314</p><p>315</p><p>316</p><p>317</p><p>318</p><p>319</p><p>320</p><p>321</p><p>322</p><p>323</p><p>324</p><p>325</p><p>326</p><p>327</p><p>328</p><p>329</p><p>330</p><p>331</p><p>332</p><p>333</p><p>334</p><p>335</p><p>336</p><p>337</p><p>338</p><p>339</p><p>340</p><p>341</p><p>342</p><p>343</p><p>344</p><p>345</p><p>346</p><p>347</p><p>348</p><p>349</p><p>350</p><p>351</p><p>352</p><p>353</p><p>354</p><p>355</p><p>356</p><p>357</p><p>358</p><p>359</p><p>360</p><p>361</p><p>362</p><p>363</p><p>364</p><p>365</p><p>366</p><p>367</p><p>368</p><p>369</p><p>370</p><p>371</p><p>372</p><p>373</p><p>374</p><p>375</p><p>376</p><p>377</p><p>378</p><p>379</p><p>380</p><p>381</p><p>382</p><p>383</p><p>384</p><p>385</p><p>386</p><p>387</p><p>388</p><p>389</p><p>390</p><p>391</p><p>392</p><p>393</p><p>394</p><p>395</p><p>396</p><p>397</p><p>398</p><p>399</p><p>400</p><p>401</p><p>402</p><p>403</p><p>404</p><p>405</p><p>406</p><p>407</p><p>408</p><p>409</p><p>410</p><p>411</p><p>412</p><p>413</p><p>414</p><p>415</p><p>416</p><p>417</p><p>418</p><p>419</p><p>420</p><p>421</p><p>422</p><p>423</p><p>424</p><p>425</p><p>426</p><p>427</p><p>428</p><p>429</p><p>430</p><p>431</p><p>432</p><p>433</p><p>434</p><p>435</p><p>436</p><p>437</p><p>438</p><p>439</p><p>440</p><p>441</p><p>442</p><p>443</p><p>444</p><p>445</p><p>446</p><p>447</p><p>448</p><p>449</p><p>450</p><p>451</p><p>452</p><p>453</p><p>454</p><p>455</p><p>456</p><p>457</p><p>458</p><p>459</p><p>460</p><p>461</p><p>462</p><p>463</p><p>464</p><p>465</p><p>466</p><p>467</p><p>468</p><p>469</p><p>470</p><p>471</p><p>472</p><p>473</p><p>474</p><p>475</p><p>476</p><p>477</p><p>478</p><p>479</p><p>480</p><p>481</p><p>482</p><p>483</p><p>484</p><p>485</p><p>486</p><p>487</p><p>488</p><p>489</p><p>490</p><p>491</p><p>492</p><p>493</p><p>494</p><p>495</p><p>496</p><p>497</p><p>498</p><p>499</p><p>500</p><p>501</p><p>502</p><p>503</p><p>504</p><p>505</p><p>506</p><p>507</p><p>508</p><p>509</p><p>510</p><p>511</p><p>512</p><p>513</p><p>514</p><p>515</p><p>516</p><p>517</p><p>518</p><p>519</p><p>520</p><p>521</p><p>522</p><p>523</p><p>524</p><p>525</p><p>526</p><p>527</p><p>528</p><p>529</p><p>530</p><p>531</p><p>532</p><p>533</p><p>534</p><p>535</p><p>536</p><p>537</p><p>538</p><p>539</p><p>540</p><p>541</p><p>542</p><p>543</p><p>544</p><p>545</p><p>546</p><p>547</p><p>548</p><p>549</p><p>550</p><p>551</p><p>552</p><p>553</p><p>554</p><p>555</p><p>556</p><p>557</p><p>558</p><p>559</p><p>560</p><p>561</p><p>562</p><p>563</p><p>564</p><p>565</p><p>566</p><p>567</p><p>568</p><p>569</p><p>570</p><p>571</p><p>572</p><p>573</p><p>574</p><p>575</p><p>576</p><p>577</p><p>578</p><p>579</p><p>580</p><p>581</p><p>582</p><p>583</p><p>584</p><p>585</p><p>586</p><p>587</p><p>588</p><p>589</p><p>590</p><p>591</p><p>592</p><p>593</p><p>594</p><p>595</p><p>596</p><p>597</p><p>598</p><p>599</p><p>600</p><p>601</p><p>602</p><p>603</p><p>604</p><p>605</p><p>606</p><p>607</p><p>608</p><p>609</p><p>610</p><p>611</p><p>612</p><p>613</p><p>614</p><p>615</p><p>616</p><p>617</p><p>618</p><p>619</p><p>620</p><p>621</p><p>622</p><p>623</p><p>624</p><p>625</p><p>626</p><p>627</p><p>628</p><p>629</p><p>630</p><p>631</p><p>632</p><p>633</p><p>634</p><p>635</p><p>636</p><p>637</p><p>638</p><p>639</p><p>640</p><p>641</p><p>642</p><p>643</p><p>644</p><p>645</p><p>646</p><p>647</p><p>648</p><p>649</p><p>650</p><p>651</p><p>652</p><p>653</p><p>654</p><p>655</p><p>656</p><p>657</p><p>658</p><p>659</p><p>660</p><p>661</p><p>662</p><p>663</p><p>664</p><p>665</p><p>666</p><p>667</p><p>668</p><p>669</p><p>670</p><p>671</p><p>672</p><p>673</p><p>674</p><p>675</p><p>676</p><p>677</p><p>678</p><p>679</p><p>680</p><p>681</p><p>682</p><p>683</p><p>684</p><p>685</p><p>686</p><p>687</p><p>688</p><p>689</p><p>690</p><p>691</p><p>692</p><p>693</p><p>694</p><p>695</p><p>696</p><p>697</p><p>698</p><p>699</p><p>700</p><p>701</p><p>702</p><p>703</p><p>704</p><p>705</p><p>706</p><p>707</p><p>708</p><p>709</p><p>710</p><p>711</p><p>712</p><p>713</p><p>714</p><p>715</p><p>716</p><p>717</p><p>718</p><p>719</p><p>720</p><p>721</p><p>722</p><p>723</p><p>724</p><p>725</p><p>726</p><p>727</p><p>728</p><p>729</p><p>730</p><p>731</p><p>732</p><p>733</p><p>734</p><p>735</p><p>736</p><p>737</p><p>738</p><p>739</p><p>740</p><p>741</p><p>742</p><p>743</p><p>744</p><p>745</p><p>746</p><p>747</p><p>748</p><p>749</p><p>750</p><p>751</p><p>752</p><p>753</p><p>754</p><p>755</p><p>756</p><p>757</p><p>758</p><p>759</p><p>760</p><p>761</p><p>762</p><p>763</p><p>764</p><p>765</p><p>766</p><p>767</p><p>768</p><p>769</p><p>770</p><p>771</p><p>772</p><p>773</p><p>774</p><p>775</p><p>776</p><p>777</p><p>778</p><p>779</p><p>780</p><p>781</p><p>782</p><p>783</p><p>784</p><p>785</p><p>786</p><p>787</p><p>788</p><p>789</p><p>790</p><p>791</p><p>792</p><p>793</p><p>794</p><p>795</p><p>796</p><p>797</p><p>798</p><p>799</p><p>800</p><p>801</p><p>802</p><p>803</p><p>804</p><p>805</p><p>806</p><p>807</p><p>808</p><p>809</p><p>810</p><p>811</p><p>812</p><p>813</p><p>814</p><p>815</p><p>816</p><p>817</p><p>818</p><p>819</p><p>820</p><p>821</p><p>822</p><p>823</p><p>824</p><p>825</p><p>826</p><p>827</p><p>828</p><p>829</p><p>830</p><p>831</p><p>832</p><p>833</p><p>834</p><p>835</p><p>836</p><p>837</p><p>838</p><p>839</p><p>840</p><p>841</p><p>842</p><p>843</p><p>844</p><p>845</p><p>846</p><p>847</p><p>848</p><p>849</p><p>850</p><p>851</p><p>852</p><p>853</p><p>854</p><p>855</p><p>856</p><p>857</p><p>858</p><p>859</p><p>860</p><p>861</p><p>862</p><p>863</p><p>864</p><p>865</p><p>866</p><p>867</p><p>868</p><p>869</p><p>870</p><p>871</p><p>872</p><p>873</p><p>874</p><p>875</p><p>876</p><p>877</p><p>878</p><p>879</p><p>880</p><p>881</p><p>882</p><p>883</p><p>884</p><p>885</p><p>886</p><p>887</p><p>888</p><p>889</p><p>890</p><p>891</p><p>892</p><p>893</p><p>894</p><p>895</p><p>896</p><p>897</p><p>898</p><p>899</p><p>900</p><p>901</p><p>902</p><p>903</p><p>904</p><p>905</p><p>906</p><p>907</p><p>908</p><p>909</p><p>910</p><p>911</p><p>912</p><p>913</p><p>914</p><p>915</p><p>916</p><p>917</p><p>918</p><p>919</p><p>920</p><p>921</p><p>922</p><p>923</p><p>924</p><p>925</p><p>926</p><p>927</p><p>928</p><p>929</p><p>930</p><p>931</p><p>932</p><p>933</p><p>934</p><p>935</p><p>936</p><p>937</p><p>938</p><p>939</p><p>940</p><p>941</p><p>942</p><p>943</p><p>944</p><p>945</p><p>946</p><p>947</p><p>948</p><p>949</p><p>950</p><p>951</p><p>952</p><p>953</p><p>954</p><p>955</p><p>956</p><p>957</p><p>958</p><p>959</p><p>960</p><p>961</p><p>962</p><p>963</p><p>964</p><p>965</p><p>966</p><p>967</p><p>968</p><p>969</p><p>970</p><p>971</p><p>972</p><p>973</p><p>974</p><p>975</p><p>976</p><p>977</p><p>978</p><p>979</p><p>980</p><p>981</p><p>982</p><p>983</p><p>984</p><p>985</p><p>986</p><p>987</p><p>988</p><p>989</p><p>990</p><p>991</p><p>992</p><p>993</p><p>994</p><p>995</p><p>996</p><p>997</p><p>998</p><p>999</p></div>
      </div>
    </div>
  `
  )
})

test('Render nested elements', async () => {
  const comp1 = () => {
    return html`<h1>Component 1</h1>`
  }

  const comp2 = html` <h1>Component 2</h1> `

  const layout = ({ children }) => {
    return html`${children} ${() => children}`
  }

  const reactiveOut = renderToString(
    html`${() => layout({ children: html`${comp1()}${comp2}` })}`
  )

  const staticOut = renderToString(
    html`${layout({ children: html`${comp1()}${comp2}` })}`
  )

  await inlineSnapshot(
    reactiveOut,
    `<h1>Component 1</h1> <h1>Component 2</h1>  <h1>Component 1</h1> <h1>Component 2</h1> `
  )

  await inlineSnapshot(
    staticOut,
    `<h1>Component 1</h1> <h1>Component 2</h1>  <h1>Component 1</h1> <h1>Component 2</h1> `
  )
})

test.run()
